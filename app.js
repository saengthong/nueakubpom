const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const path = require("path");
const nodemailer = require("nodemailer");
const mysqlSession = require("express-mysql-session")(session);

const app = express();

const db = mysql.createConnection({
    host: "beu2zhww96tijpngxrov-mysql.services.clever-cloud.com",
    user: "ucrqeilqdxlhvkhp",
    password: "Uzwli4wadL6q7gvSPhh7",
    database: "beu2zhww96tijpngxrov"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const sessionStore = new mysqlSession({
    host: "beu2zhww96tijpngxrov-mysql.services.clever-cloud.com",
    user: "ucrqeilqdxlhvkhp",
    password: "Uzwli4wadL6q7gvSPhh7",
    database: "beu2zhww96tijpngxrov",
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000
});

app.use(
    session({
        key: "user_sid",
        secret: "node",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86400000
        }
    })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function ifLogin(req, res, next) {
    if (req.session.user) {
        return res.redirect("/");
    } else {
        next();
    }
}
function ifAccount(req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}
function checkAdmin(req, res, next) {
    if (req.session.user) {
        const email = req.session.user.email;
        const checkAdminEmail =
            "SELECT * FROM users WHERE email = ? AND role = 'admin'";
        db.query(checkAdminEmail, [email], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                const admin = result[0];
                req.session.admin = admin;
                res.render("admin/index", { admin: req.session.admin });
            } else {
                res.redirect("/?niawebNoAdmin=true");
            }
        });
    } else {
        res.redirect("/");
    }
}
function ifAdmin(req, res, next) {
    if (!req.session.admin) {
        return res.redirect("/");
    } else {
        next();
    }
}
function isVideo(req, res, next) {
    if (req.session.user) {
        const videoQuery = "SELECT * FROM urlvideo";
        db.query(videoQuery, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res
                    .status(500)
                    .send("An error occurred while fetching videos.");
            }
            req.session.videoS = results.length > 0 ? results : [];
            next();
        });
    } else {
        req.session.videoS = [];
        next();
    }
}

app.get("/", isVideo, (req, res) => {
    const videos = req.session.videoS || [];
    const user = req.session.user;
    res.render("index", { videos, user });
});

app.get("/about", (req, res) => {
    res.render("about", { user: req.session.user });
});

app.get("/contact", (req, res) => {
    res.render("contact", { user: req.session.user });
});

app.get("/login", ifLogin, (req, res) => {
    res.render("login");
});

app.get("/register", ifLogin, (req, res) => {
    res.render("register");
});

app.get("/reportBug", (req, res) => {
    res.render("reportBug", { user: req.session.user });
});

app.get("/setting", ifAccount, (req, res) => {
    res.render("setting", { user: req.session.user });
});

app.get("/admin/setting", ifAdmin, (req, res) => {
    res.render("admin/setting", { admin: req.session.admin });
});

// Setting Account
app.post('/admin/changeName', (req, res) => {
    const { name } = req.body;
    const userId = req.session.user.id;
    const updateNameQuery = "UPDATE users SET name = ? WHERE id = ?";
    
    db.query(updateNameQuery, [name, userId], (err, result) => {
        if (err) {
            console.error("Error updating name:", err);
            res.redirect("/admin/setting?niawebUpdateFailed=true");
        } else {
            req.session.user.name = name;
            res.redirect("/admin/setting?niawebUpdateSuccess=true");
        }
    });
});
app.post('/admin/changeUsername', (req, res) => {
    const { username, password } = req.body;
    const userId = req.session.user.id;
    
    const checkPasswordQuery = "SELECT * FROM users WHERE id = ?";
    db.query(checkPasswordQuery, [userId], (err, result) => {
        if (err) {
            console.error("Error checking password:", err);
            res.redirect("/admin/setting?niawebUpdateFailed=true");
        } else if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                const updateUsernameQuery = "UPDATE users SET username = ? WHERE id = ?";
                db.query(updateUsernameQuery, [username, userId], (err, result) => {
                    if (err) {
                        console.error("Error updating username:", err);
                        res.redirect("/admin/setting?niawebUpdateFailed=true");
                    } else {
                        req.session.user.username = username;
                        res.redirect("/admin/setting?niawebUpdateSuccess=true");
                    }
                });
            } else {
                res.redirect("/admin/setting?niawebPasswordIncorrect=true");
            }
        }
    });
});
app.post('/admin/changeEmail', (req, res) => {
    const { Nemail, password } = req.body;
    const userId = req.session.user.id;
    
    const checkPasswordQuery = "SELECT * FROM users WHERE id = ?";
    db.query(checkPasswordQuery, [userId], (err, result) => {
        if (err) {
            console.error("Error checking password:", err);
            res.redirect("/admin/setting?niawebUpdateFailed=true");
        } else if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
                db.query(checkEmailQuery, [Nemail], (err, emailResult) => {
                    if (err) {
                        console.error("Error checking email:", err);
                        res.redirect("/admin/setting?niawebUpdateFailed=true");
                    } else if (emailResult.length > 0) {
                        res.redirect("/admin/setting?niawebEmailExists=true");
                    } else {
                        const updateEmailQuery = "UPDATE users SET email = ? WHERE id = ?";
                        db.query(updateEmailQuery, [Nemail, userId], (err, result) => {
                            if (err) {
                                console.error("Error updating email:", err);
                                res.redirect("/admin/setting?niawebUpdateFailed=true");
                            } else {
                                req.session.user.email = Nemail;
                                res.redirect("/admin/setting?niawebUpdateSuccess=true");
                            }
                        });
                    }
                });
            } else {
                res.redirect("/setting?niawebPasswordIncorrect=true");
            }
        }
    });
});
app.post('/admin/changePassword', (req, res) => {
    const { Opass, Npass } = req.body;
    const userId = req.session.user.id;

    const checkPasswordQuery = "SELECT * FROM users WHERE id = ?";
    db.query(checkPasswordQuery, [userId], (err, result) => {
        if (err) {
            console.error("Error checking password:", err);
            res.redirect("/admin/setting?niawebUpdateFailed=true");
        } else if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(Opass, user.password)) {
                const hashedNewPassword = bcrypt.hashSync(Npass, 12);
                const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";
                db.query(updatePasswordQuery, [hashedNewPassword, userId], (err, result) => {
                    if (err) {
                        console.error("Error updating password:", err);
                        res.redirect("/admin/setting?niawebUpdateFailed=true");
                    } else {
                        req.session.user.password = hashedNewPassword;
                        res.redirect("/admin/setting?niawebUpdateSuccess=true");
                    }
                });
            } else {
                res.redirect("/admin/setting?niawebPasswordIncorrect=true");
            }
        }
    });
});
app.post('/changeName', (req, res) => {
    const { name } = req.body;
    const userId = req.session.user.id;
    const updateNameQuery = "UPDATE users SET name = ? WHERE id = ?";
    
    db.query(updateNameQuery, [name, userId], (err, result) => {
        if (err) {
            console.error("Error updating name:", err);
            res.redirect("/setting?niawebUpdateFailed=true");
        } else {
            req.session.user.name = name;
            res.redirect("./setting?niawebUpdateSuccess=true");
        }
    });
});
app.post('/changeUsername', (req, res) => {
    const { username, password } = req.body;
    const userId = req.session.user.id;
    
    const checkPasswordQuery = "SELECT * FROM users WHERE id = ?";
    db.query(checkPasswordQuery, [userId], (err, result) => {
        if (err) {
            console.error("Error checking password:", err);
            res.redirect("/setting?niawebUpdateFailed=true");
        } else if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                const updateUsernameQuery = "UPDATE users SET username = ? WHERE id = ?";
                db.query(updateUsernameQuery, [username, userId], (err, result) => {
                    if (err) {
                        console.error("Error updating username:", err);
                        res.redirect("/setting?niawebUpdateFailed=true");
                    } else {
                        req.session.user.username = username;
                        res.redirect("/setting?niawebUpdateSuccess=true");
                    }
                });
            } else {
                res.redirect("/setting?niawebPasswordIncorrect=true");
            }
        }
    });
});
app.post('/changeEmail', (req, res) => {
    const { Nemail, password } = req.body;
    const userId = req.session.user.id;
    
    const checkPasswordQuery = "SELECT * FROM users WHERE id = ?";
    db.query(checkPasswordQuery, [userId], (err, result) => {
        if (err) {
            console.error("Error checking password:", err);
            res.redirect("/setting?niawebUpdateFailed=true");
        } else if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
                db.query(checkEmailQuery, [Nemail], (err, emailResult) => {
                    if (err) {
                        console.error("Error checking email:", err);
                        res.redirect("/setting?niawebUpdateFailed=true");
                    } else if (emailResult.length > 0) {
                        res.redirect("/admin/setting?niawebEmailExists=true");
                    } else {
                        const updateEmailQuery = "UPDATE users SET email = ? WHERE id = ?";
                        db.query(updateEmailQuery, [Nemail, userId], (err, result) => {
                            if (err) {
                                console.error("Error updating email:", err);
                                res.redirect("/setting?niawebUpdateFailed=true");
                            } else {
                                req.session.user.email = Nemail;
                                res.redirect("/setting?niawebUpdateSuccess=true");
                            }
                        });
                    }
                });
            } else {
                res.redirect("/setting?niawebPasswordIncorrect=true");
            }
        }
    });
});
app.post('/changePassword', (req, res) => {
    const { Opass, Npass } = req.body;
    const userId = req.session.user.id;

    const checkPasswordQuery = "SELECT * FROM users WHERE id = ?";
    db.query(checkPasswordQuery, [userId], (err, result) => {
        if (err) {
            console.error("Error checking password:", err);
            res.redirect("/setting?niawebUpdateFailed=true");
        } else if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(Opass, user.password)) {
                const hashedNewPassword = bcrypt.hashSync(Npass, 12);
                const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";
                db.query(updatePasswordQuery, [hashedNewPassword, userId], (err, result) => {
                    if (err) {
                        console.error("Error updating password:", err);
                        res.redirect("/setting?niawebUpdateFailed=true");
                    } else {
                        req.session.user.password = hashedNewPassword;
                        res.redirect("/setting?niawebUpdateSuccess=true");
                    }
                });
            } else {
                res.redirect("/setting?niawebPasswordIncorrect=true");
            }
        }
    });
});

app.get("/admin", checkAdmin, (req, res) => {
    res.render("admin/index", {
        user: req.session.user,
        admin: req.session.admin
    });
});
app.get("/admin/addV", ifAdmin, (req, res) => {
    res.render("admin/addV", { admin: req.session.admin });
});
app.get("/admin/listV", isVideo, ifAdmin, (req, res) => {
    const videos = req.session.videoS;
    const admin = req.session.admin;
    if (Array.isArray(videos)) {
        res.render("admin/listV", { videos, admin });
    } else {
        res.render("admin/listV", { message: videos });
    }
});
app.get("/admin/deleteV", isVideo, ifAdmin, (req, res) => {
    const videos = req.session.videoS;
    const admin = req.session.admin;
    if (Array.isArray(videos)) {
        res.render("admin/deleteV", { videos, admin });
    } else {
        res.render("admin/deleteV", { message: videos });
    }
});
app.post("/admin/deleteV", (req, res) => {
    const { nameV } = req.body;
    const deleteVQuery = "DELETE FROM urlvideo WHERE title = ?";
    db.query(deleteVQuery, [nameV], (err, result) => {
        if (err) throw err;
        if (result) {
            res.redirect("/admin/deleteV?niawebDeleteSuccess=true");
        } else {
            res.redirect("/admin/deleteV?niawebDeleteFailed=true");
        }
    });
});
app.get("/admin/deleteAllV", (req, res) => {
    const deleteAllQuery = "DELETE FROM urlvideo";
    db.query(deleteAllQuery, (err, result) => {
        if (err) throw err;
        if (result) {
            const resetAutoIncrementQuery =
                "ALTER TABLE urlvideo AUTO_INCREMENT = 1";
            db.query(resetAutoIncrementQuery, (err, result) => {
                if (err) throw err;
                res.redirect("/admin/deleteV?niawebDeleteSuccess=true");
            });
        }
    });
});

app.post("/admin/addV", (req, res) => {
    const {
        namev,
        urlv,
        commentv,
        namelink1,
        namelink2,
        namelink3,
        urllink1,
        urllink2,
        urllink3
    } = req.body;
    const insertVideo =
        "INSERT INTO urlvideo(title,url,link1,link2,link3,Tlink1,Tlink2,Tlink3) VALUES(?,?,?,?,?,?,?,?)";
    db.query(
        insertVideo,
        [
            namev,
            urlv,
            urllink1,
            urllink2,
            urllink3,
            namelink1,
            namelink2,
            namelink3
        ],
        (err, result) => {
            if (err) throw err;
            if (result) {
                res.redirect("/admin/addV?niawebAddVSuccess=true");
            } else {
                res.redirect("/admin/addV?niawebAddVFailed=true");
            }
        }
    );
});

app.get("/logoutByWeb", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            res.redirect("/?logoutByWebFailed=true");
        } else {
            res.clearCookie("user_sid");
            res.redirect("/?logoutByWebSuccess=true");
        }
    });
});

app.post("/register", (req, res) => {
    const { name, username, email, password, ConfirmPassword } = req.body;
    const checkEmailExists =
        "SELECT * FROM users WHERE username = ? AND email = ?";
    db.query(checkEmailExists, [name, email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.redirect("/register?niawebEmailOrNameExists=true");
        } else {
            if (password.length < 4) {
                res.redirect("/register?niawebPasswordNot4=true");
            } else {
                if (ConfirmPassword !== password) {
                    res.redirect("/register?PasswordNotMatch=true");
                } else {
                    const insertUserToDatabase =
                        "INSERT INTO users(role, name, username, email, password) VALUES('user', ?, ?, ?, ?)";
                    const hashPassword = bcrypt.hashSync(password, 12);
                    db.query(
                        insertUserToDatabase,
                        [name, username, email, hashPassword],
                        (err, result) => {
                            if (err) throw err;
                            res.redirect(
                                "/register?niawebRegisterSuccess=true"
                            );
                        }
                    );
                }
            }
        }
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const CheckEmailInDatabase =
        "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(CheckEmailInDatabase, [email, email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.redirect("/?niawebLoginSuccess=true");
            } else {
                res.redirect("/login?niawebLoginError=true");
            }
        } else {
            res.redirect("/login?niawebUserNotFound=true");
        }
    });
});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "a0653262911@gmail.com",
        pass: "imik lsso lyml gret"
    }
});

app.post("/send-mail-reportbug", async (req, res) => {
    const { to, subject, message } = req.body;
    try {
        const mailOptions = {
            from: to,
            to: "a0653262911@gmail.com",
            subject: subject,
            text: `Subject: ${subject} (Send in report bug)\nFrom: ${to}\nMessage: ${message}`
        };
        await transporter.sendMail(mailOptions);
        res.redirect("/reportBug?niawebSendMailSuccess=true");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).redirect("/reportBug?niawebSendMailFailed=true");
    }
});

app.post("/send-mail-contact", async (req, res) => {
    const { to, subject, message } = req.body;
    try {
        const mailOptions = {
            from: to,
            to: "a0653262911@gmail.com",
            subject: subject,
            text: `Subject: ${subject} (Send in contact)\nFrom: ${to}\nMessage: ${message}`
        };
        await transporter.sendMail(mailOptions);
        res.redirect("/contact?niawebSendMailSuccess=true");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).redirect("/contact?niawebSendMailFailed=true");
    }
});

app.use((req, res) => {
    res.status(404).render("err/404", {
        user: req.session.user,
        admin: req.session.admin
    });
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
