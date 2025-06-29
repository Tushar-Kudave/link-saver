const inputbtn = document.getElementById("input-btn")
let myleads = []
const inputEl= document.getElementById('input-el')
let ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

//To get the local storage object.
const leadsfromLocalStorage = JSON.parse(localStorage.getItem("myleads"))
if(leadsfromLocalStorage){
	myleads= leadsfromLocalStorage
	render(myleads)
}

//Sho the added links to the browser extension.
function render(leads){
	let listItems = ""
	for(let i = 0;i<leads.length; i++){
		listItems += `
			<li>
				<a target ='_blank' href='${leads[i]}'>
					${leads[i]}
				</a>
			</li>`
	}
	ulEl.innerHTML = listItems
}

//To add the link.
inputbtn.addEventListener("click", function() {
	myleads.push(inputEl.value)
	inputEl.value = ""
	localStorage.setItem("myleads", JSON.stringify(myleads))
	render(myleads)
})

//To add the tab link.
tabBtn.addEventListener("click", function(){
	
	chrome.tabs.query({active: true, currentWindow: true}, function(){
		myleads.push(tabs[0].url)
		localStorage.setItem("myleads", JSON.stringify(myleads))
		render(myleads)
	})

})

//To delete all the links.
deletebtn.addEventListener("dblclick", function(){
	localStorage.clear()
	myleads =[]
	render(myleads)
});



