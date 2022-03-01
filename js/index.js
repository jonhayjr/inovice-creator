//Constants
const taskList = document.querySelector('.task-list');
const totalList = document.querySelector('.total-list');
const totalDollarAmount = document.getElementById('total-dollar-amount');
const taskButtons = document.querySelectorAll('.task-btn')
const removeButtons = document.querySelectorAll('.remove');
const sendInvoiceBtn = document.getElementById('send-invoice');

let tasks = [];

//Function to render list items
const renderListItems = () => {
    //Clear existing items from list
    taskList.textContent = '';
    totalList.textContent = '';

    //Add task elements from array 
    tasks.forEach(tsk => {
        //Add to task list
        const taskItem = document.createElement('li');
        const removeSpan = document.createElement('span');
        taskItem.className = 'list-item';
        taskItem.textContent = tsk.name;

        removeSpan.textContent = 'Remove';
        removeSpan.className = 'remove';
        taskItem.append(removeSpan);

        taskList.append(taskItem);

        //Add to total list
        const totalItem = document.createElement('li');
        const dollarSpan = document.createElement('span');
        totalItem.className = 'list-item';
        totalItem.textContent = tsk.total;

        dollarSpan.textContent = '$';
        dollarSpan.className = 'dollar-symbol';
        totalItem.prepend(dollarSpan);

        totalList.append(totalItem);

    })

   //Update total amount
    totalDollarAmount.textContent = "$" + totalSum(tasks);
}

//Function to get total sum
const totalSum = (arr) => {
   const sum = arr.reduce((sum, { total }) => sum + parseInt(total), 0)
   return sum;
}

//Function to remove task items
const removeTaskItem = (item) => {
    //Select parent elements and get value
    const parentListItem = item.target.parentElement;
    const parentListItemValue = parentListItem.textContent.replaceAll('Remove', '');
    const index = tasks.indexOf(parentListItemValue);

    //Remove items from respective arrays
    tasks.splice(index, 1);
}

//Function to reset elements
const resetValues = () => {
    //Reset arrays
    tasks = [];

    //Re-render elements
    renderListItems();
}


//Event Listener for task buttons
taskButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        //Get values from data attributes
        const task = e.target.getAttribute('data-task');
        const total = e.target.getAttribute('data-total');

        //Create object with task values
        const newTask = {name: task, total: total};

        //Check for index of new item
        const index = tasks.findIndex((task) => {
             return task.name === newTask.name;
        })

        //Only add item if it doesn't already exists in array
        if (index === -1) {
            //Push to task array
            tasks.push(newTask)
        }

        //Render new elements
        renderListItems();

    })
});

//Event Listener for remove buttons
taskList.addEventListener('click', (e) => {
    //Only trigger when span elements are clicked
    if (e.target.nodeName === 'SPAN') {
        removeTaskItem(e);

        renderListItems();

    }
})

//Event Listener for send invoice button
sendInvoiceBtn.addEventListener('click', () => {
    resetValues();
})