const form=document.getElementById("bookingForm");
const customerName=document.getElementById("customerName"),eventSelect=document.getElementById("event"),ticketQuantity=document.getElementById("ticketQuantity"),studentTicket=document.getElementById("studentTicket");
const nameError=document.getElementById("nameError"),eventError=document.getElementById("eventError"),quantityError=document.getElementById("quantityError"),estimatedTotal=document.getElementById("estimatedTotal"),processingMessage=document.getElementById("processingMessage"),resultMessage=document.getElementById("resultMessage");
const STANDARD_PRICE=50,STUDENT_DISCOUNT=.20;
function calculateTotal(){const q=Number(ticketQuantity.value);const safe=Number.isFinite(q)&&q>0?q:0;return safe*(studentTicket.checked?STANDARD_PRICE*(1-STUDENT_DISCOUNT):STANDARD_PRICE)}
function updateTotal(){estimatedTotal.textContent="Estimated total: €"+calculateTotal().toFixed(2)}
ticketQuantity.addEventListener("input",updateTotal);studentTicket.addEventListener("change",updateTotal);
form.addEventListener("submit",function(e){e.preventDefault();clearMessages();const q=Number(ticketQuantity.value);let valid=true;
if(customerName.value.trim()===""){nameError.textContent="Full name is required.";valid=false}
if(eventSelect.value===""){eventError.textContent="Select an event.";valid=false}
if(!Number.isInteger(q)||q<1||q>6){quantityError.textContent="Ticket quantity must be between 1 and 6.";valid=false}
if(!valid)return;
const booking={name:customerName.value.trim(),event:eventSelect.options[eventSelect.selectedIndex].text,quantity:q,student:studentTicket.checked,total:calculateTotal().toFixed(2)};
sessionStorage.setItem("eventBooking",JSON.stringify(booking));
processingMessage.textContent="Processing booking...";processingMessage.className="processing-message active";
setTimeout(function(){processingMessage.textContent="";processingMessage.className="processing-message";resultMessage.textContent="Booking confirmed";resultMessage.className="result-message success";
setTimeout(function(){window.location.href="confirmation.html"},700)},1200);
});
function clearMessages(){nameError.textContent="";eventError.textContent="";quantityError.textContent="";processingMessage.textContent="";processingMessage.className="processing-message";resultMessage.textContent="";resultMessage.className="result-message"}
updateTotal();