import React, {useEffect} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Chart from 'chart.js/auto';
import Signatures from '../../../../lib/signatures';

const MyPetition = () => {


    const {signatures, isSignaturesLoading} = useTracker(() => {
        const handler = Meteor.subscribe('chartSignatures')
        const noDataAvailable = { signatures: [] };

        if (!handler.ready()) {
            return { ...noDataAvailable, isSignaturesLoading: true };
        }
        const signatures = Signatures.find().fetch();
        console.log(signatures);
        return {signatures}
    });

    // useEffect(() => {
    //     createChart();
    // });

    // let counts = arr.reduce((acc, value) => ({
    //     ...acc,
    //     [value]: (acc[value] || 0) + 1
    //  }), {});

    const createChart = () => {
        var ctx = document.getElementById('myChart');
        // const custom = [{12, 19, 3, 5, 2, 3}]
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


    return ( 
        <div>

            {
                isSignaturesLoading ?
                <div>loading...</div> :
                <div>
                    {
                    signatures.map((item) => <div key={item._id}>"{item.createdAt.toLocaleDateString()}",</div>)
                    }
                </div>
            }

{/* setHours(0, 0, 0) */}


            admin
            <canvas id="myChart" width="400" height="400"></canvas>

            <button onClick={createChart}>Create chart</button>
        </div>
    );
}

export default MyPetition;