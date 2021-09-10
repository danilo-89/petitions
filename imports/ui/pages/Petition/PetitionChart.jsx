import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Line } from 'react-chartjs-2';
import Signatures from '../../../../lib/signatures';
import './PetitionChart.css'
import Form from 'react-bootstrap/Form';
import CsvDownloader from 'react-csv-downloader';

const PetitionChart = (props) => {

    const [optionValue, setOptionValue] = useState('all');
    const [data1, setData1] = useState();

    const { signatures, isSignaturesLoading, handler } = useTracker(() => {
        const handler = Meteor.subscribe('chartSignatures', props.petitionId, optionValue)

        const noDataAvailable = { signatures: [] };

        if (!handler.ready()) {
            return { ...noDataAvailable, isSignaturesLoading: true, handler };
        }
        const signatures = Signatures.find({}).fetch();
        return { signatures, handler }
    }, [optionValue]);

    useEffect(() => {

        setData1(genData());

    }, [isSignaturesLoading, optionValue, signatures?.length]);

    const genData = () => {

        const custom = signatures ? countObject(signatures) : [];
        const dataValue = signatures ? [...custom.values()] : [];
        const labelsValue = signatures ? [...custom.keys()] : [];


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
                    label: '# of petition signatures',
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

        const sortStringKeys = (a, b) => String(a[0]).localeCompare(b[0])

        const newArr = arr.map((item) => item.createdAt.toLocaleDateString('zh-Hans-CN'))

        // preserve order
        const reduceArr = new Map([...newArr.reduce((acc, value) => acc.set(value, (acc.get(value) || 0) + 1), new Map())].sort(sortStringKeys));

        return reduceArr;
    }


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
        <div>

            <Form.Group className="mb-0">
                <Form.Control
                    as="select"
                    value={optionValue}
                    className="list-1-custom"
                    onChange={(e) => { handler.stop(); setOptionValue(e.target.value) }}
                >
                    <option value="day">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="year">Last 12 months</option>
                    <option value="all">All</option>
                </Form.Control>
            </Form.Group>

            <div className='petition-chart-container'>
                <Line
                    id='signaturesChart'
                    data={data1}
                    options={options1}
                />

                <CsvDownloader 
                    filename={`${props.title}_signatures_${
                        (optionValue==='day')?'last 7 days'
                        :(optionValue==='month')?'last 30 days'
                        :(optionValue==='year')?'last 365 days'
                        :'full data'
                    }`}
                    extension=".csv"
                    separator=";"
                    wrapColumnChar=""
                    datas={signatures}
                    className="text-center mt-3"
                >
                    <button className="btn btn-primary">Download CSV</button>
                </CsvDownloader>
            </div>

            {/* {
                isSignaturesLoading ?
                    <div>loading...</div> :
                    <div>
                        {
                            signatures.map((item) => <div key={item._id}>"{item.createdAt.toLocaleDateString()}",</div>)
                        }
                    </div>
            } */}

        </div>
    );
}

export default PetitionChart;