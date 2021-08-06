var userid=localStorage.getItem("userid")
var uemail=localStorage.getItem("uemail")

var db=firebase.firestore()
db.collection("users").doc(uemail).get().then((doc)=>{        
    document.getElementById("name").value=doc.data().uname     
    document.getElementById("number").value=doc.data().uphone
    var date=new Date
    var finaldate=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
    document.getElementById("date").value=finaldate
})


document.getElementById("addamount").addEventListener("click", () => {
    var date = document.getElementById("date").value
    var name = document.getElementById("name").value
    var amount = document.getElementById("amount").value
    var number = document.getElementById("number").value
    if(date.length==0){
        toastr["error"]("Please Enter Date")
        return false
    }else if(amount.length==0){
        toastr["error"]("Please Enter Amount")
        return false
    }else{
    $.ajax({
        method: "POST",
        url: "/payment/paymentadd",
        data: {           
            amount: amount * 100,
            currency: "INR",
            receipt: "su001",
            payment_capture: '1'
        },
        success:(res)=>{            
            pay(res.sub.id)
        }
    })
    function pay(id) {
        var options = {
            "key": "rzp_live_YXToUEMpuUyuFj",  //Enter your razorpay key ()  rzp_live_YXToUEMpuUyuFj
            "currency": "INR",
            "name": "Greenpay",
            "description": "Account Recharge",
            "image": "/public/img/logo.png",
            // "order_id": document.getElementById('rzp-text').value,
            "order_id": id,
            "handler": function (response) {               
               sendpay(response)
            },
            "theme": {
                "color": "#227254"
            }
        };
        var rzp = new Razorpay(options);
     
        rzp.open();        
    }
    function sendpay(res){
        console.log(res)
        $.ajax({
            method: "POST",
            url: "/payment/paymentsend",
            data: {           
               name:name,
               date:date,
               amount:amount,
               phone:number,
               razorpay_payment_id:res.razorpay_payment_id,
               razorpay_order_id:res.razorpay_order_id,
               userid:userid,
               uemail:uemail
            },
            success:(res)=>{
                console.log(res)
                window.location.replace("/payment")
                
            }
        })
    }
}
})