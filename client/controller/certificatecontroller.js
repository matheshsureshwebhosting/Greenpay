var express = require('express');
var app = express();
var firebase = require("../database/firebase")
var db = firebase.firestore();

const moment=require("moment")


exports.allcertificate = (req, res) => {
    res.render("certificates")
}
exports.gstmonthly = (req, res) => {
    res.render("gstmonthly")
}
exports.postgstmonthly = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        GstmonthlyCertificate: {
                            purchase: req.body.purchase,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        GstmonthlyCertificate: {
                            purchase: req.body.purchase,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.incometax = (req, res) => {
    res.render("incometax")
}
exports.postincometax = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        IncometaxCertificate: {
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            statement: req.body.statement,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        IncometaxCertificate: {
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            statement: req.body.statement,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.FSSAI = (req, res) => {
    res.render("FSSAI")
}
exports.postFSSAI = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        FSSAICertificate: {
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            photo: req.body.photo,
                            rental: req.body.rental,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        FSSAICertificate: {
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            photo: req.body.photo,
                            rental: req.body.rental,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Fire = (req, res) => {
    res.render("Fire")
}
exports.postFire = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        FireCertificate: {
                            business: req.body.business,
                            bulding: req.body.bulding,
                            rental: req.body.rental,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        FireCertificate: {
                            business: req.body.business,
                            bulding: req.body.bulding,
                            rental: req.body.rental,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Pvt = (req, res) => {
    res.render("Pvt")
}
exports.postPvt = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        PvtCertificate: {
                            kyc: req.body.kyc,
                            account: req.body.account,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        PvtCertificate: {
                            kyc: req.body.kyc,
                            account: req.body.account,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Drug = (req, res) => {
    res.render("Drug")
}
exports.postDrug = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        DrugCertificate: {
                            agreement: req.body.agreement,
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            pharm: req.body.pharm,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        DrugCertificate: {
                            agreement: req.body.agreement,
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            pharm: req.body.pharm,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Residential = (req, res) => {
    res.render("Residential")
}
exports.postResidential = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        Residential: {
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            sign: req.body.sign,
                            photo: req.body.photo,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        Residential: {
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            sign: req.body.sign,
                            photo: req.body.photo,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}



exports.OAB = (req, res) => {
    res.render("OAB")
}
exports.postOAB = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        OAB: {
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            sign: req.body.sign,
                            bank: req.body.bank,
                            photo: req.body.photo,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        OAB: {
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            sign: req.body.sign,
                            bank: req.body.bank,
                            photo: req.body.photo,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}

exports.migration = (req, res) => {
    res.render("migration-certificate")
}
exports.postmigration = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        CRRI: {
                            degree: req.body.degree,
                            mark: req.body.mark,
                            sign: req.body.sign,
                            CRRI: req.body.CRRI,
                            photo: req.body.photo,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        CRRI: {
                            degree: req.body.degree,
                            mark: req.body.mark,
                            sign: req.body.sign,
                            CRRI: req.body.CRRI,
                            photo: req.body.photo,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.farmer = (req, res) => {
    res.render("farmer-certificate")
}
exports.postfarmer = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        FarmerCertificate: {
                            adangal: req.body.adangal,
                            sign: req.body.sign,
                            self: req.body.self,
                            sale: req.body.sale,
                            address: req.body.address,
                            encumbrance: req.body.encumbrance,
                            chitta: req.body.chitta,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        FarmerCertificate: {
                            adangal: req.body.adangal,
                            sign: req.body.sign,
                            self: req.body.self,
                            sale: req.body.sale,
                            address: req.body.address,
                            encumbrance: req.body.encumbrance,
                            chitta: req.body.chitta,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.widow = (req, res) => {
    res.render("widow-pension")
}
exports.postwidow = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        WidowPension: {
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            sign: req.body.sign,
                            bank: req.body.bank,
                            photo: req.body.photo,
                            death: req.body.death,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        WidowPension: {
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            sign: req.body.sign,
                            bank: req.body.bank,
                            photo: req.body.photo,
                            death: req.body.death,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}

exports.IRCTC = (req, res) => {
    res.render("IRCTC")
}
exports.postIRCTC = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        IRCTC: {
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            eb: req.body.eb,
                            MSME: req.body.MSME,
                            visiting: req.body.visiting,
                            license: req.body.license,
                            photo: req.body.photo,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        IRCTC: {
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            eb: req.body.eb,
                            MSME: req.body.MSME,
                            visiting: req.body.visiting,
                            license: req.body.license,
                            photo: req.body.photo,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}

exports.pattatransfer = (req, res) => {
    res.render("pattatransfer")
}
exports.postpattatransfer = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        Pattatransfer: {
                            pata: req.body.pata,
                            smart: req.body.smart,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                            ec: req.body.ec
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        Pattatransfer: {
                            pata: req.body.pata,
                            smart: req.body.smart,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                            ec: req.body.ec
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Itfiling = (req, res) => {
    res.render("Itfiling")
}
exports.postItfiling = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        Itfiling: {
                            form: req.body.form,
                            bank: req.body.bank,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        Itfiling: {
                            form: req.body.form,
                            bank: req.body.bank,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Smartcard = (req, res) => {
    res.render("Smartcard")
}
exports.postSmartcard = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        Smartcard: {
                            photo: req.body.photo,
                            aadharbirth: req.body.aadharbirth,
                            aadhar: req.body.aadhar,
                            gas: req.body.gas,
                            marriage: req.body.marriage,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        Smartcard: {
                            photo: req.body.photo,
                            aadharbirth: req.body.aadharbirth,
                            aadhar: req.body.aadhar,
                            gas: req.body.gas,
                            marriage: req.body.marriage,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Legalheircertificate = (req, res) => {
    res.render("legalheir")
}
exports.postLegalheircertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        LegalheirCertificate: {
                            photo: req.body.photo,
                            smart: req.body.smart,
                            aadhar: req.body.aadhar,
                            sonaadhar: req.body.sonaadhar,
                            sign: req.body.sign,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        LegalheirCertificate: {
                            photo: req.body.photo,
                            smart: req.body.smart,
                            aadhar: req.body.aadhar,
                            sonaadhar: req.body.sonaadhar,
                            sign: req.body.sign,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Obccertificate = (req, res) => {
    res.render("obccertificate")
}
exports.postObccertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        ObcCertificate: {
                            photo: req.body.photo,
                            income: req.body.income,
                            address: req.body.address,
                            community: req.body.community,
                            incometax: req.body.incometax,
                            others: req.body.others,
                            self: req.body.self,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        ObcCertificate: {
                            photo: req.body.photo,
                            income: req.body.income,
                            address: req.body.address,
                            community: req.body.community,
                            incometax: req.body.incometax,
                            others: req.body.others,
                            self: req.body.self,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Nomalecertificate = (req, res) => {
    res.render("nomalecertificate")
}
exports.postNomalecertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        NomaleCertificate: {
                            photo: req.body.photo,
                            residence: req.body.residence,
                            sterilization: req.body.sterilization,
                            smart: req.body.smart,
                            birth: req.body.birth,
                            others: req.body.others,
                            self: req.body.self,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        NomaleCertificate: {
                            photo: req.body.photo,
                            residence: req.body.residence,
                            sterilization: req.body.sterilization,
                            smart: req.body.smart,
                            birth: req.body.birth,
                            others: req.body.others,
                            self: req.body.self,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Nativecertificate = (req, res) => {
    res.render("Nativecertificate")
}
exports.postNativecertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        NativeCertificate: {
                            photo: req.body.photo,
                            sign: req.body.sign,
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            education: req.body.education,
                            others: req.body.others,
                            customer: req.body.customer,
                            birth: req.body.birth
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        NativeCertificate: {
                            photo: req.body.photo,
                            sign: req.body.sign,
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            education: req.body.education,
                            others: req.body.others,
                            customer: req.body.customer,
                            birth: req.body.birth
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}

exports.MSMEcertificate = (req, res) => {
    res.render("MSME")
}
exports.postMSMEcertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        MSMECertificate: {
                            pan: req.body.pan,
                            visiting: req.body.visiting,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        MSMECertificate: {
                            pan: req.body.pan,
                            visiting: req.body.visiting,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}

exports.Pancertificate = (req, res) => {
    res.render("pan")
}
exports.postPancertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        PanCertificate: {
                            photo: req.body.photo,
                            sign: req.body.sign,
                            card: req.body.card,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isPan: true,
                            pancertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        PanCertificate: {
                            photo: req.body.photo,
                            sign: req.body.sign,
                            card: req.body.card,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isPan: true,
                            pancertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Firstgraduatecertificate = (req, res) => {
    res.render("Firstgraduatecertificate")
}
exports.postFirstgraduatecertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        FirstGraduateCertificate: {
                            photo: req.body.photo,
                            address: req.body.address,
                            transfer: req.body.transfer,
                            father: req.body.father,
                            mother: req.body.mother,
                            fathertransfer: req.body.fathertransfer,
                            mothertransfer: req.body.mothertransfer,
                            smart: req.body.smart,
                            self: req.body.self,
                            academic: req.body.academic,
                            others: req.body.others
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        FirstGraduateCertificate: {
                            photo: req.body.photo,
                            address: req.body.address,
                            transfer: req.body.transfer,
                            father: req.body.father,
                            mother: req.body.mother,
                            fathertransfer: req.body.fathertransfer,
                            mothertransfer: req.body.mothertransfer,
                            smart: req.body.smart,
                            self: req.body.self,
                            academic: req.body.academic,
                            others: req.body.others
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Communitycertificte = (req, res) => {
    res.render("Communitycertificate")
}
exports.postCommunitycertificte = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        CommunityCertificate: {
                            photo: req.body.photo,
                            sign: req.body.sign,
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            community: req.body.community,
                            others: req.body.others,
                            customer: req.body.customer,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        CommunityCertificate: {
                            photo: req.body.photo,
                            sign: req.body.sign,
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            community: req.body.community,
                            others: req.body.others,
                            customer: req.body.customer,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Incomecertificate = (req, res) => {
    res.render("Incomecertificate")
}
exports.postIncomecertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        IncomeCertificate: {
                            photo: req.body.photo,
                            sign: req.body.sign,
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            others: req.body.others,
                            customer: req.body.customer,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        IncomeCertificate: {
                            photo: req.body.photo,
                            sign: req.body.sign,
                            aadhar: req.body.aadhar,
                            smart: req.body.smart,
                            others: req.body.others,
                            customer: req.body.customer,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => { console.log("add certificate") })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Unemploymentcerificate = (req, res) => {
    res.render("Unemploymentcerificate")
}
exports.postUnemploymentcerificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate1 = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        UnemploymentCertificate: {
                            photo: req.body.photo,
                            education: req.body.education,
                            address: req.body.address,
                            transfer: req.body.transfer,
                            others: req.body.others,
                            self: req.body.self,
                            family: req.body.family,
                            employment: req.body.employment,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        UnemploymentCertificate: {
                            photo: req.body.photo,
                            education: req.body.education,
                            address: req.body.address,
                            transfer: req.body.transfer,
                            others: req.body.others,
                            self: req.body.self,
                            family: req.body.family,
                            employment: req.body.employment,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Unmarriedcertificate = (req, res) => {
    res.render("Unmarriedcertificate")
}
exports.postUnmarriedcertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        UnmarriedCertificate: {
                            photo: req.body.photo,
                            age: req.body.age,
                            address: req.body.address,
                            self: req.body.self,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        UnmarriedCertificate: {
                            photo: req.body.photo,
                            age: req.body.age,
                            address: req.body.address,
                            self: req.body.self,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.voteridcertificate = (req, res) => {
    res.render("voterid")
}
exports.postvoteridcertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        VoteridCertificate: {
                            photo: req.body.photo,
                            smart: req.body.smart,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        VoteridCertificate: {
                            photo: req.body.photo,
                            smart: req.body.smart,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.Widowcertificate = (req, res) => {
    res.render("widowcertificate")
}
exports.postWidowcertificate = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        WidowCertificate: {
                            photo: req.body.photo,
                            death: req.body.death,
                            address: req.body.address,
                            marrage: req.body.marrage,
                            self: req.body.self,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        WidowCertificate: {
                            photo: req.body.photo,
                            death: req.body.death,
                            address: req.body.address,
                            marrage: req.body.marrage,
                            self: req.body.self,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc", req.body.Certificatename)
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}



exports.Gst = (req, res) => {
    res.render("Gst")
}
exports.postGst = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        GstCertificate: {
                            photo: req.body.photo,
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            rental: req.body.rental,
                            current: req.body.current,
                            others: req.body.others
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        GstCertificate: {
                            photo: req.body.photo,
                            aadhar: req.body.aadhar,
                            pan: req.body.pan,
                            rental: req.body.rental,
                            current: req.body.current,
                            others: req.body.others
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}
exports.InterCaste = (req, res) => {
    res.render("Intercastecertificate")
}
exports.postInterCaste = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
        //var cdate = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        var username = req.body.name
        var usernumber = req.body.number
        var udocid = username.split(" ").join("") + usernumber
        db.collection("users").doc(req.body.uemail).get().then((snap) => {
            db.collection("Documents").doc(udocid).get().then((doc) => {
                if (doc.data() == undefined) {
                    db.collection("Documents").doc(udocid).set({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        InterCasteCertificate: {
                            photo: req.body.photo,
                            permanent: req.body.permanent,
                            permanentbride: req.body.permanentbride,
                            marriage: req.body.marriage,
                            self: req.body.self,
                            address: req.body.address,
                            others: req.body.others
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "new doc" })
                    })
                } else {
                    db.collection("Documents").doc(udocid).update({
                        udocid: udocid,
                        appliedname: snap.data().uname,
                        appliedemail: snap.data().uemail,
                        appliedeph: snap.data().uphone,
                        date: cdate,
                        name: req.body.name,
                        number: req.body.number,
                        email: req.body.email,
                        InterCasteCertificate: {
                            photo: req.body.photo,
                            permanent: req.body.permanent,
                            permanentbride: req.body.permanentbride,
                            marriage: req.body.marriage,
                            self: req.body.self,
                            address: req.body.address,
                            others: req.body.others
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isAll: true,
                            allcertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            if (snap.data().ureferral != undefined) {
                                var distributor = db.collection("distributor").doc(snap.data().ureferral).collection("wallet").doc(snap.data().ureferral)
                                distributor.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributor.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributor updated")
                                        })
                                    } else {
                                        distributor.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributor add")
                                        })
                                    }
                                })

                                var distributortotal = db.collection("distributor").doc(snap.data().ureferral).collection("total").doc(snap.data().ureferral)
                                distributortotal.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        distributortotal.update({
                                            amount: Number(2) + Number(docs.data().amount)
                                        }).then(() => {
                                            console.log("distributortotal updated")
                                        })
                                    } else {
                                        distributortotal.set({
                                            amount: Number(2)
                                        }).then(() => {
                                            console.log("distributortotal add")
                                        })
                                    }
                                })
                                var distributorbranch = db.collection("distributor").doc(snap.data().ureferral).collection("branch").doc(snap.data().uemail)
                                distributorbranch.get().then((docs) => {
                                    if (docs.data() != undefined) {
                                        if (docs.data().amount != undefined) {
                                            distributorbranch.update({
                                                amount: Number(2) + docs.data().amount
                                            }).then(() => {
                                                console.log("distributorbranch 2+ updated")
                                            })
                                        } else {
                                            distributorbranch.update({
                                                amount: 2
                                            }).then(() => {
                                                console.log("distributorbranch 2 updated")
                                            })
                                        }
                                    } else {
                                        distributorbranch.update({
                                            amount: 2
                                        }).then(() => {
                                            console.log("distributorbranch add")
                                        })
                                    }
                                })
                            }
                            console.log("add certificate")
                        })
                        res.send({ status: "update doc" })
                    })
                }
            })
        })
    } catch (error) {
        return res.send(false)
    }
}