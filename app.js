//VARIABLES

        //Scroll
            scrollObject = undefined
            scrollDirection = {
                up: 0,
                down: 0
            }

        const gestureZone = document.querySelector('.contents')

//DOM ELEMENTS    
    // Nav Buttons
        const
            
            btn_home = document.querySelector(`.home-btn`),
            btn_projects = document.querySelector(`.projects-btn`),
            btn_contact = document.querySelector(`.contact-btn`),
            mainNavBtns = document.querySelectorAll('#main-nav .btn')
    // Sections
            sections = document.querySelectorAll(".content");
            scrollabeSections = document.querySelectorAll(".scroll-page")
    //Event Listeners
        //Scroll
            window.addEventListener('scroll', scrollSections)

        //Header BTNs
            btn_home.addEventListener('click', () => changeSection(0,true))
            btn_projects.addEventListener('click', () => changeSection(1,true))
            btn_contact.addEventListener('click', () => changeSection(2,true))
        //Swipe
            gestureZone.addEventListener('touchstart', function(event) {
                touchstartX = event.changedTouches[0].screenX;
                touchstartY = event.changedTouches[0].screenY;
            }, false);
            
            gestureZone.addEventListener('touchend', function(event) {
                touchendX = event.changedTouches[0].screenX;
                touchendY = event.changedTouches[0].screenY;
                handleGesture();
            }, false); 
            

//FUNCTIONS
function scrollSections(){
    const
        scrolls = document.querySelectorAll('.scroll-page')
    let
        selected = undefined
    scrolls.forEach((scroll,index)=>{
        if(Math.floor(scroll.getBoundingClientRect().y)<=0){
            selected = index
        }
    })
    changeSection(selected,false)
}

function goDownOrUp(direction){
            if(direction == 'down'){
                if(scrollDirection.down<4.5){
                    scrollDirection.down = scrollDirection.down+1.5
                }else{
                    changeSection(checkSelectedSection()+1)
                    scrollDirection.down = 0         
                }
            }else{
                if(scrollDirection.up<4.5){
                    scrollDirection.up = scrollDirection.down+1.5
                }else{
                    changeSection(checkSelectedSection()-1)
                    scrollDirection.up = 0         
                }
            }
        

}
function changeSection(newSectionNum,scroll){
    if(newSectionNum>=0 && newSectionNum<4 ){
        if(scroll){
            focusScroller(newSectionNum)
        }
        mainNavBtns.forEach(btn=>{
            btn.classList.remove('active')
        })
        mainNavBtns[newSectionNum].classList.add('active')

        if(checkSelectedSection()!=0 && newSectionNum==0){
            hideOrShowAtHome()
        }
        if(checkSelectedSection()==0 && newSectionNum!=0){
            hideOrShowAtHome()
        }

        const actualSelectedSection = checkSelectedSection();

    //if new section is before
            sections[newSectionNum].classList.remove('up')
            sections[newSectionNum].classList.remove('down')


        sections.forEach((currentValue, index, arr) =>{
            if(index<newSectionNum){
                currentValue.classList.add('up')
                currentValue.classList.remove('down')
            }
            if(index>newSectionNum){
                currentValue.classList.add('down')
                currentValue.classList.remove('up')
            }
        })


    

    }
}

function checkSelectedSection(){
    let selectedIndex = undefined;
    sections.forEach(
        (currentValue, index) => {
            if(!(currentValue.classList.contains('up') || currentValue.classList.contains('down'))){
                selectedIndex = index
        }
    }
    )
    return selectedIndex
}

function focusScroller(num){
    scrollabeSections[num].scrollIntoView()
}

copyToHome()
function copyToHome(){
    let
        mainNav = document.querySelector('#main-nav'),
        menuCopy = document.querySelector("#menu-copy"),
        footer = document.querySelector('footer'),
        footerCopy = document.querySelector('.footer-copy') 

    menuCopy.innerHTML = mainNav.innerHTML
    menuCopy.querySelector("li").remove()
    menuCopy.querySelectorAll('button').forEach((btn,index) =>{
        btn.addEventListener('click', () => changeSection(index+1,true))
    })
    footer.querySelector("#links")
    footerCopy.innerHTML = footer.innerHTML


}

function hideOrShowAtHome(){

    document.querySelector(".actual-content .footer").classList.toggle('hidden')
    document.querySelector("#top-section").classList.toggle('hidden')
}
fromJsonToHtml()

function fromJsonToHtml(){
    fetch("projects.json")
    .then(res => res.json() )
    .then(data =>{

        //Create Project btns
        data.forEach((item,idx) => {
            let newItem = document.createElement('li')
            newItem.innerHTML = item.title

            newItem.addEventListener('click', ()=>{
                document.querySelectorAll(".projects-btns li").forEach(li => li.classList.remove('active'))
                newItem.classList.add('active')
                showData(idx)
            })
            document.querySelector(".projects-btns").appendChild(newItem)
        })
        //Select First btn
        document.querySelectorAll(".projects-btns li")[0].classList.add('active')
        showData(0)
    
        //Show data
        function showData(num){
            //Change subheading
            document.querySelector("#projects .wrapper h2").innerText = data[num].subheading
            //Change Description
            document.querySelector("#projects .wrapper p").innerHTML = 
            `
            <img src="${data[num].links.img}" alt="" srcset="">
            ${data[num].description}
            `
            //Change tags
            document.querySelector(".used-skills").innerHTML = ""
            data[num].tags.forEach(tag => {
                let newTag = document.createElement("li")
                newTag.innerText = tag

                document.querySelector(".used-skills").appendChild(newTag)
            })
            //Change btn links
            const btns = document.querySelectorAll(".see-project button")
            btns[0].innerHTML = `<a href="${data[num].links.mockup}" target="_blank">MOCKUP</a>`
            btns[1].innerHTML = `<a href="${data[num].links.code}" target="_blank">CODE</a>`
            btns[2].innerHTML = `<a href="${data[num].links.liveDemo}" target="_blank">LIVE DEMO</a>`
            

        }
    }
    
    )
    

}


//Testing

changeSection(0)