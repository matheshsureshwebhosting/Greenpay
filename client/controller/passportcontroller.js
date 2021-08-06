var express = require('express');
var app = express();
var firebase = require("../database/firebase")
var db = firebase.firestore();

const moment=require("moment")

exports.passport = (req, res) => {
    res.render("passport")
}
exports.passportnew = (req, res) => {
    res.render("passportnew")
}
exports.postpassportnew = (req, res) => {
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
                        FreshPassport: {
                            marksheet: req.body.marksheet,
                            photo: req.body.photo,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                            sign: req.body.sign
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
                        FreshPassport: {
                            marksheet: req.body.marksheet,
                            photo: req.body.photo,
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                            sign: req.body.sign
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
exports.passportrenewal = (req, res) => {
    res.render("passportrenewal")
}

exports.postpassportrenewal = (req, res) => {
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
                        RenewalPassport: {
                            copy: req.body.copy,
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
                        RenewalPassport: {
                            copy: req.body.copy,
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
exports.tatkaal = (req, res) => {
    res.render("tatkal")
}

exports.posttatkaal = (req, res) => {
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
                        Tatkal: {
                            aadhar: req.body.aadhar,
                            election: req.body.election,
                            id: req.body.id,
                            certificate: req.body.certificate,
                            identity: req.body.identity,
                            ration: req.body.ration,
                            property: req.body.property,
                            pension: req.body.pension,
                            license: req.body.license,
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
                        Tatkal: {
                            aadhar: req.body.aadhar,
                            election: req.body.election,
                            id: req.body.id,
                            certificate: req.body.certificate,
                            identity: req.body.identity,
                            ration: req.body.ration,
                            property: req.body.property,
                            pension: req.body.pension,
                            license: req.body.license,
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
exports.policeclearance = (req, res) => {
    res.render("policeclearance")
}
exports.postpoliceclearance = (req, res) => {
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
                        PoliceClearance: {
                            original: req.body.original,
                            others: req.body.others,
                            visa: req.body.visa,
                            status: req.body.status,
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
                        PoliceClearance: {
                            original: req.body.original,
                            others: req.body.others,
                            visa: req.body.visa,
                            status: req.body.status,
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
exports.childrenewal = (req, res) => {
    res.render("childrenewal")
}
exports.postchildrenewal = (req, res) => {
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
                        ChildRenewal: {
                            photo: req.body.photo,
                            others: req.body.others,
                            sign: req.body.sign,
                            copy: req.body.copy,
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
                        ChildRenewal: {
                            photo: req.body.photo,
                            others: req.body.others,
                            sign: req.body.sign,
                            copy: req.body.copy,
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
exports.childadult = (req, res) => {
    res.render("adultrenewal")
}
exports.postchildadult = (req, res) => {
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
                        ChildAdult: {
                            photo: req.body.photo,
                            others: req.body.others,
                            sign: req.body.sign,
                            marksheet: req.body.marksheet,
                            aadhar: req.body.aadhar,
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
                        ChildAdult: {
                            photo: req.body.photo,
                            others: req.body.others,
                            sign: req.body.sign,
                            marksheet: req.body.marksheet,
                            aadhar: req.body.aadhar,
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