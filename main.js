// function uniq(){
//     let a = 1;
//     function inc(){
// 		return 'Uniq' + (++a);
//     }
// return inc;
// }

let root = document.getElementById('root');

//Board
class Board{
    constructor(name){
        this.name = name;
        this.id = Date.now();
        this.arrOfList = [];
    }
    // create LIst
    createChild(listName){
        let list = new List(listName, this);
        this.arrOfList.push(list);
    }
    
    handleSave(Input){
        console.log('handleSave')
        if(!Input.value) return;
        console.log(this)
        this.createChild(Input.value);
        this.renderBoard(root);
    }

    handleReplace(e){
        console.log('test',e.target.parentElement,this)
        let par = e.target.parentElement;
        let Input = document.createElement('INPUT');
        let saveBtn = document.createElement('BUTTON');
        saveBtn.addEventListener('click',() =>this.handleSave(Input))
        saveBtn.textContent = 'save';
        par.innerHTML = null;
        par.appendChild(Input);
        par.appendChild(saveBtn);
    }
    

    renderBoard(parElm){
        parElm.innerHTML = `<h2>${this.name}</h2>`
        let listDiv = document.createElement('DIV');
        listDiv.setAttribute('class','parentList')
        this.arrOfList.forEach(list => {
            list.renderList(listDiv);
        })
        parElm.appendChild(listDiv);

        let parentOfBtn = document.createElement('DIV');
        let btn = document.createElement('button');
        btn.textContent = '+ADD A LIST';
        parentOfBtn.appendChild(btn);
        listDiv.appendChild(parentOfBtn);
        btn.addEventListener('click',(e) =>this.handleReplace(e));

        
    }
}

//CRUD




//lists
class List{
    constructor(name,parentBoard){
        this.name = name;
        this.id = Date.now();

        this.arrOfCards = [];

        this.parentBoard = parentBoard;
    }

    createChild(cardVal){
        let card = new Card(cardVal, this, this.parentBoard);
        this.arrOfCards.push(card);
    }

    handleSave(Input){
        if(!Input.value) return;
        console.log(this)
        this.createChild(Input.value);
        this.parentBoard.renderBoard(root);
    }

    handleReplace(e){
        let par = e.target.parentElement;
        let Input = document.createElement('textarea');
        let saveBtn = document.createElement('BUTTON');
        saveBtn.addEventListener('click',() =>this.handleSave(Input))
        saveBtn.textContent = 'save';
        par.innerHTML = null;
        par.appendChild(Input);
        par.appendChild(saveBtn);
    }

    renderList(parElm){
        let div = document.createElement('DIV');
        div.innerHTML = `<h5>${this.name}</h5>`
        let ul = document.createElement('UL')
        this.arrOfCards.forEach(card => {
            card.renderCard(ul);
        })
        div.appendChild(ul);
        parElm.appendChild(div);

        let parentOfBtn = document.createElement('DIV');
        let btn = document.createElement('button');
        btn.textContent = '+ADD A CARD';
        parentOfBtn.appendChild(btn);
        div.appendChild(parentOfBtn);
        btn.addEventListener('click',(e) =>this.handleReplace(e));
    }

    deleteCard(e){

    }
}



//CRUD


//parent Board

//cards
class Card{
    constructor(val,parentList,parentBoard){
        this.value = val;
        this.id = Date.now();


        this.parentList = parentList;
        this.parentBoard = parentBoard;
    }

    renderCard(parElm){
        let li = document.createElement('LI')
        let edit = document.createElement('BUTTON') 
        edit.textContent = 'edit'
        let del =  document.createElement('BUTTON')
        del.textContent = 'del'
        li.textContent = this.value;

        edit.setAttribute('data-id',this.id)
        del.setAttribute('data-id',this.id)
        li.appendChild(edit);
        li.appendChild(del);

        edit.addEventListener('click',(e)=>{
            let id = e.target.dataset.id;
            let card = this.parentList.arrOfCards.filter(cards => id == cards.id);
            let par = e.target.parentElement;
            par.innerHTML = null;
            let Input = document.createElement('input')
            Input.value = card[0].value;
            par.appendChild(Input);

            Input.addEventListener('blur',() =>{
                console.log(this)
                if(!Input.value) {
                    this.parentBoard.renderBoard(root);
                    return;
                }
                card[0].value = Input.value;
                this.parentBoard.renderBoard(root);
            })
        })
        //delete btn listner to delete card
        del.addEventListener('click',(e)=>{
            console.log(this,'del')
            let id = e.target.dataset.id;
            let indexToDel;
            this.parentList.arrOfCards.forEach((cards,i) => {
                if(id == cards.id){
                    indexToDel = i
                }
            })
            this.parentList.arrOfCards.splice(indexToDel,1);
            this.parentBoard.renderBoard(root);
        })

        parElm.appendChild(li);
    }

}

//parent Board
//parent List

//CRUD

let board1 = new Board('board1');
board1.renderBoard(root);