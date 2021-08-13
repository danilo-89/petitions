import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import Signatures from '../../../../lib/signatures';
import './MyPetition.css'
import makeQR from '../../components/GenerateQR';
import Form from 'react-bootstrap/Form';

const MyPetition = () => {

    const [dateRange, setDateRange] = useState();
    const [data1, setData1] = useState();

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

    const genData = () => {
        
        const custom = countObject(signatures);
        
        return {
          labels: [...custom.keys()],
          datasets: [
            {
              label: '# of Votes',
              data: [...custom.values()],
              fill: false,
              backgroundColor: '#16DB93',
              borderColor: '#16DB93',
              tension: 0.1,
              borderWidth: 2,
            },
          ],
      }
    };

    useEffect(() => {
        if (isSignaturesLoading == false) {

            setData1(genData());
            // const checkIfChart = Chart?.instances?.length || false;
            // console.log(checkIfChart)
            // if (checkIfChart) {
            //     console.log("already exists");
            //     updateData();
            // } else {
            //     console.log("chart init");
            //     createChart();
            // }
        }
    }, [isSignaturesLoading]);

    const countObject = (arr) => {

        const sortStringKeys = (a, b) => String(a[0]).localeCompare(b[0])

        const newArr = arr.map((item) => item.createdAt.toLocaleDateString())
        // const newArr = arr.map((item) => item.createdAt.getFullYear().toString().substr(-2) + "/" + (item.createdAt.getMonth() + 1))
        // const reduceArr = newArr.reduce((acc, value) => ({
        //     ...acc,
        //     [value]: (acc[value] || 0) + 1
        // }), {});


        // preserve order
        const reduceArr = new Map([...newArr.reduce((acc, value) => acc.set(value, (acc.get(value) || 0) + 1), new Map())].sort(sortStringKeys));

        console.log(reduceArr);
        return reduceArr;
    }

    const createChart = () => {

        var ctx = document.getElementById('myChart').getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgba(22, 219, 147, 0.5)')
        gradient.addColorStop(0.85, 'rgba(22, 219, 147, 0.4)')
        gradient.addColorStop(1, 'rgba(22, 219, 147, 0.1)')

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: `test`,
                    data: [],
                    fill: 'start',

                    backgroundColor: gradient,
                    borderColor: '#16DB93',
                    tension: 0.1,
                    borderWidth: 2,
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                        gridLines: {
                            color: 'green'
                        }
                    }]
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

        setTimeout(() => {
            updateData()
        }, 5000)





        // setTimeout(() => {
        //     // CHART.js
        //     var ctx = document.getElementById('myChart').getContext('2d');
        //     var gradient = ctx.createLinearGradient(0, 0, 0, 400)
        //     gradient.addColorStop(0, 'rgba(13, 150, 254, 0.7)')
        //     gradient.addColorStop(0.6, 'transparent')
        //     const labels = [];
        //     var myChart = new Chart(ctx, {
        //         type: 'line',
        //         data: {
        //             labels: labels,
        //             datasets: [{
        //                 label: `${FlowRouter.getQueryParam('coin')}/${FlowRouter.getQueryParam('stable')}`,
        //                 data: [],
        //                 fill: 'start',

        //                 backgroundColor: gradient,
        //                 borderColor: '#0D95FE',
        //                 tension: 0.1,
        //                 borderWidth: 2,
        //             }]
        //         },
        //         options: {
        //             scales: {
        //                 xAxes: [{
        //                     display: false
        //                 }],
        //                 yAxes: [{
        //                     ticks: {
        //                         fontColor: "lightgray",
        //                     }
        //                 }],
        //                 y: {
        //                     beginAtZero: true
        //                 }
        //             },
        //             maintainAspectRatio: false,
        //             responsive: true,
        //             legend: {
        //                 display: false
        //             },
        //             elements: {
        //                 point: {
        //                     radius: 0
        //                 }
        //             },
        //         }
        //     });
        //     // CHART.js END

        //     updateData()

        // }, 0)



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


    function updateData() {

        console.log('inside update 0')

        console.log(Chart)
        console.log(Chart.getChart())
        console.log(Chart?.instances?.length)

        if (Chart?.instances?.length) {
            console.log('inside update 1')

            Chart.helpers.each(Chart.instances, function (instance) {


                console.log('inside update 2')
                const chart = instance;

                const custom = countObject(signatures);
                chart.data.labels = [...custom.keys()];
                chart.data.datasets[0].data = [...custom.values()];

                chart.update()

            })
        }

    }


    // var gradient = ctx.createLinearGradient(0, 0, 0, 400)
    // gradient.addColorStop(0, 'rgba(22, 219, 147, 0.5)')
    // gradient.addColorStop(0.85, 'rgba(22, 219, 147, 0.4)')
    // gradient.addColorStop(1, 'rgba(22, 219, 147, 0.1)')

  
      
      const options1 = {
        scales: {
            xAxes: [{
                display: false,
                gridLines: {
                    color: 'green'
                }
            }]
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


    return (
        <div className="container">



        <Line data={data1} options={options1} />

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