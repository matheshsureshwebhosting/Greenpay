var db = firebase.firestore();
var uemail=localStorage.getItem("uemail")
var userid=localStorage.getItem("userid")
db.collection("users").doc(uemail).collection("wallet").doc(uemail).get()
    .then(function (doc) {
        if(doc.data()!=undefined){
            console.log(doc.data().amount)
            document.getElementById("balance").innerHTML=doc.data().amount
        }
        else{
            document.getElementById("balance").innerHTML=0
        }
    })

    db.collection("users").doc(uemail).collection("history").get()
    .then(function (snap) {
        snap.forEach(function(doc){

        var data = []			
            document.getElementById("history").innerHTML += `
            <tr>
            <td>
            <div class="userDatatable-content">
                ${doc.data().date}
            </div>
		</td>
		<td>
            <div class="userDatatable-content">
                ${doc.data().status}
            </div>
		</td>
		<td>
            <div class="userDatatable-content">
                ${doc.data().amount}
            </div>
        </td>
        <td>
            <div class="userDatatable-content" id="certificate${doc.id}">
            </div>
        </td>
		</tr>`

			
        })
    })