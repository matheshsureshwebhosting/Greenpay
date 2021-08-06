var express = require('express');
var app = express();
var firebase = require("../database/firebase")
var db = firebase.firestore();

const moment =require("moment")

exports.Flightticket = (req, res) => {
    res.render("flightticket")
}
exports.postFlightticket = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
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
                        passport: req.body.passport,
                        trip: req.body.trip,
                        FlightTicket: {
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
                        passport: req.body.passport,
                        trip: req.body.trip,
                        FlightTicket: {
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

exports.Thirupathiticket = (req, res) => {
    res.render("thirupathi")
}
exports.postThirupathiticket = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
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
                        ThirupathiTicket: {
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("new doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            console.log("add certificate")
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
                        ThirupathiTicket: {
                            aadhar: req.body.aadhar,
                            others: req.body.others,
                        }
                    }).then(() => {
                        console.log("update doc")
                        db.collection("Documents").doc(udocid).update({
                            isOther: true,
                            othercertificates: firebase.firestore.FieldValue.arrayUnion(req.body.Certificatename)
                        }).then(() => {
                            console.log("add certificate")
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
                                                amount: Number(2) + Number(docs.data().amount)
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

exports.traintickets = (req, res) => {
    res.render("trainticket")

}
exports.posttraintickets = (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var cdate =moment().format()
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
                        trip: req.body.trip,
                        TrainTicket: {
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
                        trip: req.body.trip,
                        TrainTicket: {
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