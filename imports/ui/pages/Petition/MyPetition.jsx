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
    const [optionValue, setOptionValue] = useState('day');
    const [data1, setData1] = useState();

    const { signatures, isSignaturesLoading, handler } = useTracker(() => {
        const handler = Meteor.subscribe('chartSignatures', optionValue)

        const noDataAvailable = { signatures: [] };

        if (!handler.ready()) {
            return { ...noDataAvailable, isSignaturesLoading: true, handler };
        }
        const signatures = Signatures.find().fetch();
        console.log(signatures);
        makeQR(window.location.href)
        return { signatures, isSignaturesLoading: false, handler }
    }, [optionValue]);

    useEffect(() => {

            setData1(genData());

    }, [isSignaturesLoading, optionValue]);

    const genData = () => {
        
 
            const custom = countObject(signatures);
            const dataValue = [...custom.values()];
            const labelsValue = [...custom.keys()];
        

        if (dataValue.length === 1) {
            dataValue.push(dataValue[0])
            labelsValue.push(labelsValue[0])
        }

        var ctx = document.getElementById('signaturesChart').getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgba(22, 219, 147, 0.5)')
        gradient.addColorStop(0.85, 'rgba(22, 219, 147, 0.4)')
        gradient.addColorStop(1, 'rgba(22, 219, 147, 0.1)')
        
        return {
            labels: labelsValue,
            datasets: [
                {
                label: '# of Votes',
                data: dataValue,
                fill: 'start',
                backgroundColor: gradient,
                borderColor: '#16DB93',
                tension: 0.1,
                borderWidth: 2,
                },
            ],
        }
    };

    const countObject = (arr) => {

        // console.log("inside countObject, signatures are:");
        // console.log(signatures);

        const sortStringKeys = (a, b) => String(a[0]).localeCompare(b[0])

        const newArr = arr.map((item) => item.createdAt.toLocaleDateString('zh-Hans-CN'))
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

    


    // function updateData() {

    //     console.log('inside update 0')

    //     console.log(Chart)
    //     console.log(Chart.getChart())
    //     console.log(Chart?.instances?.length)

    //     if (Chart?.instances?.length) {
    //         console.log('inside update 1')

    //         Chart.helpers.each(Chart.instances, function (instance) {


    //             console.log('inside update 2')
    //             const chart = instance;

    //             const custom = countObject(signatures);
    //             chart.data.labels = [...custom.keys()];
    //             chart.data.datasets[0].data = [...custom.values()];

    //             chart.update()

    //         })
    //     }

    // }


      
      const options1 = {
        scales: {
            xAxes: [{
                display: false,
                gridLines: {
                    color: 'green'
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
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

            <div>{optionValue}</div>

            <Form.Group>
                <Form.Control 
                as="select"
                value = {optionValue}
                onChange = {(e) => {handler.stop(); setOptionValue(e.target.value)}}
                >
                    <option value="day">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="year">Last 12 months</option>
                </Form.Control>
            </Form.Group>


        <Line 
        id='signaturesChart'
        data={data1} 
        options={options1} 
        />

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

            

            {/* <button onClick={createChart}>Create chart</button> */}
        </div>
    );
}

export default MyPetition;