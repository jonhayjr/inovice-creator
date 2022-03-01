const taskList = document.querySelector('.task-list');
const totalList = document.querySelector('.total-list');
const totalDollarAmount = document.getElementById('total-dollar-amount');
const taskButtons = document.querySelectorAll('.task-btn')
const removeButtons = document.querySelectorAll('.remove');
const sendInvoiceBtn = document.getElementById('send-invoice');

let tasks = [];

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

//Function to get sum
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

    //Enable corresponding button
    const taskButton = document.querySelector(`[data-task="${parentListItemValue}"]`);
    taskButton.disabled = false;
}

//Function to reset elements
const resetValues = () => {
    //Reset arrays
    tasks = [];

    //Enable all task buttons 
    taskButtons.forEach(btn => {
        btn.disabled = false;
    });

    //Re-render elements
    renderListItems();
}

//Event Listener for task buttons
taskButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        //Get values from data attributes
        const task = e.target.getAttribute('data-task');
        const total = e.target.getAttribute('data-total');

        //Push to task array
        tasks.push({name: task, total: total})

        //Render new elements
        renderListItems();

        //Disable button
        e.target.disabled = true;
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