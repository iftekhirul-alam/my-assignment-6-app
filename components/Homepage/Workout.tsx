import React from 'react';

const getData =async() =>{
    const response = await fetch('https://api.abcz.workers.dev/api/fitlog');
    const data = await response.json();
    return data;
}

const Workout = async () => {
    const workoutData = await getData();
    return (
        <div className='container mx-auto m-2'>
           {workoutData.map((workout, id) =>{
            return <div key ={id} >{workout.name}</div>
           })}
        </div>
    );
};

export default Workout;