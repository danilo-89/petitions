import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Chart from 'chart.js/auto';
import Signatures from '../../../../lib/signatures';
import './MyPetition.css'
import makeQR from '../../components/GenerateQR';
import Form from 'react-bootstrap/Form';

const MyPetition = () => {

    const [dateRange, setDateRange] = useState();

    const { signatures, isSignaturesLoading } = useTracker(() => {
        const handler = Meteor.subscribe('chartSignatures')
        const noDataAvailable = { signatures: [] };

        if (!handler.ready()) {
            return { ...noDataAvailable, isSignaturesLoading: true };
        }
        const signatures = Signatures.find().fetch();
        console.log(signatures);
        makeQR(window.location.href)
        return { signatures, isSignaturesLoading: false }
    });

    useEffect(() => {
        if (isSignaturesLoading == false) {
            const checkIfChart = Chart?.instances?.length || false;
            console.log(checkIfChart)
            if (checkIfChart) {
                console.log("already exists");
            } else {
                console.log("chart init");
                createChart();
            }
        }
    }, [isSignaturesLoading]);

    const countObject = (arr) => {
        const newArr = arr.map((item) => item.createdAt.toLocaleDateString())
        const reduceArr = newArr.reduce((acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
        }), {});
        console.log(reduceArr);
        return reduceArr;
    }

    const createChart = () => {

        var ctx = document.getElementById('myChart').getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgba(13, 150, 254, 0.7)')
        gradient.addColorStop(0.6, 'transparent')

        const custom = countObject(signatures);

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(custom),
                datasets: [{
                    label: `test`,
                    data: Object.values(custom),
                    fill: 'start',

                    backgroundColor: gradient,
                    borderColor: '#0D95FE',
                    tension: 0.1,
                    borderWidth: 2,
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: "lightgray",
                        }
                    }],
                    y: {
                        beginAtZero: true
                    }
                },
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
            }
        });

        console.log(Chart?.instances[0]?.chart?.canvas?.id || "no");
        // CHART.js END

        // updateData()









        // var ctx = document.getElementById('myChart');
        // const custom = {
        //     January: 10,
        //     February: 20,
        //     March: 19,
        //     April: 20,
        //     May: 10,
        //     June: 109,
        // }
        // var myChart = new Chart(ctx, {
        //     type: 'bar',
        //     data: {
        //         labels: Object.keys(custom),
        //         datasets: [{
        //             label: '# of Votes',
        //             data: Object.values(custom),
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(255, 99, 132, 1)',
        //                 'rgba(54, 162, 235, 1)',
        //                 'rgba(255, 206, 86, 1)',
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         scales: {
        //             y: {
        //                 beginAtZero: true
        //             }
        //         }
        //     }
        // });
    }

    // function updateData() {

    //     Chart.helpers.each(Chart.instances, function (instance) {

    //         const chart = instance;
    //         //   console.log(instance.chart.canvas.id)

    //         const data = OHLCV_historical.find({}, { sort: { start: 1 } }).fetch();

    //         const formatTimes = data.map((item) => new Date(item.start).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }))

    //         const formatValues = data.map((item) => item.close)

    //         chart.data.labels = formatTimes;
    //         chart.data.datasets[0].data = formatValues;

    //         chart.update()
    //     })

    // }


    return (
        <div className="container">

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



            <Form.Group>
               
                <Form.Control as="select">
                    <option>Default select</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 12 months</option>
                </Form.Control>
                
            </Form.Group>

            <canvas id="myChart" width="400" height="400"></canvas>

            <button onClick={createChart}>Create chart</button>
        </div>
    );
}

export default MyPetition;