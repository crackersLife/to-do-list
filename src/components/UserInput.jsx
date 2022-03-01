import React, { useState } from 'react';
import Calendar from 'react-calendar';
import InputText from './common/InputText';
import LabelText from './common/LabelText';
import './../styles/userInput.css';
import Texts from './../en-us';

export default function UserInput(props) {
    const [listName, setListName] = useState('Default List Name');
    const [taskCounter, setTaskCounter] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [elapsedTask, setElapsedTask] = useState([]);

    const [calDate, setCalenderDate] = useState(new Date());

/**
 * Summary: Update List Name
 */
    function updateList() {
        const inputList = document.querySelector('#input_List');
        if (inputList && inputList.value) {
            setListName(inputList.value);
        }
        inputList.value="";
    }

/**
 * Summary: Add new task in the to-do list
 */
    function addTask() {
        const inputTask = document.querySelector('#input_Task');
        if (inputTask && inputTask.value) {
            if(new Date(calDate.toDateString()).getTime() < new Date(new Date().toDateString()).getTime()) {
                setElapsedTask([...elapsedTask, {index: taskCounter, taskText: inputTask.value, taskDate: calDate}]);
            }
            else {
                setTasks([...tasks, {index: taskCounter, taskText: inputTask.value, taskDate: calDate}]);
            }
            setTaskCounter(taskCounter + 1);
            inputTask.value="";
        }
    }

/**
 * Summary: Move task up/down based on the preference
 */
    function reshuffle(e) {
        const btnId = e.target.id;
        let stepUp = false;
        if (btnId) {
            if (btnId.indexOf('btn_MoveUp') > -1) {
                stepUp = true;
            }
            const splitBy = stepUp ? 'btn_MoveUp' : 'btn_MoveDown';
            const target = parseInt(btnId.split(splitBy)[1]);
            if (target !== undefined && target !== null) {
                const mergedObj = [...elapsedTask, ...tasks];
                let indexInTaskList = mergedObj.findIndex(task => task.index === target);
                if (mergedObj.length > 0 && ((stepUp && indexInTaskList > 0) || (!stepUp && indexInTaskList < mergedObj.length - 1))) {
                    let swapWithIndex = stepUp ? indexInTaskList - 1 : indexInTaskList + 1;
                    let swappedObj = mergedObj[swapWithIndex];
                    mergedObj[swapWithIndex] = mergedObj[indexInTaskList];
                    mergedObj[indexInTaskList] = swappedObj;
                    setTasks(mergedObj.filter(x=> new Date(x.taskDate.toDateString()).getTime() >= new Date(new Date().toDateString()).getTime()));
                    setElapsedTask(mergedObj.filter(x=> new Date(x.taskDate.toDateString()).getTime() < new Date(new Date().toDateString()).getTime()));
                }
            }
        }
    }
/**
 * Summary: Mark the task as done and move to done section
 */
    function markAsDone(e) {
        if(e.target.id) {
            const target = parseInt(e.target.id.split('btn_Done')[1]);
            const elapsedCurrent = elapsedTask.find(task => task.index === target);
            const pendingCurrent = tasks.find(task => task.index === target);
            const moveObj = elapsedCurrent || pendingCurrent;
            if (moveObj) {
                setDoneTasks([...doneTasks, moveObj]);
                if (elapsedCurrent) {
                    setElapsedTask(elapsedTask.filter(x => x !== moveObj));
                } 
                else if (pendingCurrent) {
                    setTasks(tasks.filter(x => x !== moveObj));
                }
            }
        }
    }

    function updateCalender(value) {
        setCalenderDate(value);
        const cal = document.querySelector('.react-calendar');
        cal.style.display = 'none';
    }

    function showCal() {
        const cal = document.querySelector('.react-calendar');
        cal.style.display = 'block';
    }

/**
 * Summary: Delete task if added by mistake or don't want to keep track of it
 */
    function deleteTask(e) {
        if (e.target.id) {
            const target = parseInt(e.target.id.split('btn_Delete')[1]);
            const elapsedCurrent = elapsedTask.find(task => task.index === target);
            const pendingCurrent = tasks.find(task => task.index === target);
            const moveObj = elapsedCurrent || pendingCurrent;
            if (moveObj) {
                if (elapsedCurrent) {
                    setElapsedTask(elapsedTask.filter(x => x !== moveObj));
                } 
                else if (pendingCurrent) {
                    setTasks(tasks.filter(x => x !== moveObj));
                }
            }
        }
    }

/**
 * Summary: Move done task to pending if moved to done by mistake
 */
    function moveToPendingTask(e) {
        if (e.target.id) {
            const target = parseInt(e.target.id.split('btn_MoveToPending')[1]);
            const moveObj = doneTasks.find(task => task.index === target);
            if (moveObj) {
                if (new Date(moveObj.taskDate.toDateString()).getTime() < new Date(new Date().toDateString()).getTime()) {
                    setElapsedTask([...elapsedTask, moveObj]);
                }
                else {
                    setTasks([...tasks, moveObj]);
                }

                const filterd = doneTasks.filter(x => x !== moveObj);
                setDoneTasks(filterd);
            }
        }
    }

    return (
        <main className='main'>
            <InputText id={`input_List`} type={'text'} placeholder={Texts.EnterListName}/>
            <button id="btn_UpdateList" onClick={ ()=> { updateList() }}>{Texts.UpdateListName}</button>
            <LabelText id={`lbl_List`} value={`List Name: ${listName}`}/>
            <div className='taskArea'>
                <InputText id={`input_Task`} type={'text'} placeholder={Texts.AddTaskDetails}/>
                <div>
                    <button id="btn_ShowCal" onClick={ ()=> { showCal() }}>{Texts.SelectDate}</button>
                    <button id="btn_AddTask" onClick={ ()=> { addTask() }}>{Texts.Add}</button>
                </div>
                <div className='Cal-Wrapper'>
                    <Calendar onClickDay={(value)=> updateCalender(value)} value={calDate} />
                </div>
            </div>
            
            <div className='pendingTask'>
                <LabelText id={`lbl_Pending`} value={Texts.PendingTasks} className={'highlight'}/>
                { 
                    elapsedTask.map((task) => (
                        <div id={`pendingTaskDiv${task.index}`} key={task.index} className="itemWrapper">
                            <p id={`para_TaskText${task.index}`} className={`taskText`}>{`Task : ${task.taskText}`}</p>
                            <p id={`lbl_TaskDate`} className={`taskDate ${new Date(task.taskDate.toDateString()).getTime() === new Date(new Date().toDateString()).getTime() ? 'highlight' : ''}`}>{`Due on: ${task.taskDate.toDateString()}`}</p>
                            
                            <button id={`btn_MoveUp${task.index}`} onClick={ (e)=> { reshuffle(e) }}>{Texts.MoveUp}</button>
                            <button id={`btn_MoveDown${task.index}`} onClick={ (e)=> { reshuffle(e) }}>{Texts.MoveDown}</button>
                            <button id={`btn_Done${task.index}`} onClick={ (e)=> { markAsDone(e) }}>{Texts.MarkAsDone}</button>
                            <button id={`btn_Delete${task.index}`} onClick={ (e)=> { deleteTask(e) }}>{Texts.Delete}</button>
                            <br/>
                        </div>
                    ))
                }
                { 
                    (tasks && tasks.length > 0) || (elapsedTask && elapsedTask.length > 0) ? tasks.map((task) => (
                        <div id={`pendingTaskDiv${task.index}`} key={task.index} className="itemWrapper">
                            <p id={`para_TaskText${task.index}`} className={`taskText`}>{`Task : ${task.taskText}`}</p>
                            <p id={`lbl_TaskDate`} className={`taskDate ${new Date(task.taskDate.toDateString()).getTime() === new Date(new Date().toDateString()).getTime() ? 'highlight' : ''}`}>{`Due on: ${task.taskDate.toDateString()}`}</p>
                            
                            <button id={`btn_MoveUp${task.index}`} onClick={ (e)=> { reshuffle(e) }}>{Texts.MoveUp}</button>
                            <button id={`btn_MoveDown${task.index}`} onClick={ (e)=> { reshuffle(e) }}>{Texts.MoveDown}</button>
                            <button id={`btn_Done${task.index}`} onClick={ (e)=> { markAsDone(e) }}>{Texts.MarkAsDone}</button>
                            <button id={`btn_Delete${task.index}`} onClick={ (e)=> { deleteTask(e) }}>{Texts.Delete}</button>
                            <br/>
                        </div>
                    )) : <div className='paddingTopBottom'>{Texts.NoPendingTaskMessage}</div>
                }
            </div>

            <div className='doneArea'>
                <LabelText id={`lbl_Done`} value={`Done Tasks`} className={'highlight'}/>
                { 
                    doneTasks && doneTasks.length > 0 ? doneTasks.map((task) => (
                        <div id={`doneTaskDiv${task.index}`} key={task.index} className="itemWrapper">
                            <p id={`lbl_DoneList${task.index}`} className={`taskText`}>{`Task : ${task.taskText}`}</p>
                            <button id={`btn_MoveToPending${task.index}`} onClick={ (e)=> { moveToPendingTask(e) }}>{Texts.MoveToPendingAgain}</button>
                        </div>
                    )) : <div className='paddingTopBottom'></div>
                }
            </div>
        </main>
    );
}