import './VacationsStatistics.css'
import { Bar } from 'react-chartjs-2';
import Header from "../Header/Header";
import { TiArrowBack } from "react-icons/ti";
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
Chart.register(...registerables);



function VacationsStatistics() {
    let navigate = useNavigate();
    let [followedVacationsDestinations, setFollowedVacationsDestinations] = useState<string[]>([]);
    let [vacationsFollowersNumber, setVacationsFollowersNumber] = useState<number[]>([]);

    useEffect(() => {
        getFollowedVacations()
    }, [])

    let getFollowedVacations = async () => {
        let followedVacationsDestinationsArray: string[] = [];
        let vacationsFollowersNumberArray: number[] = [];
        try {
            let response = await axios.get("http://localhost:3001/vacations/sitefollowedvacations")
            let followedVacationsArrayResponse = response.data;
            if (followedVacationsArrayResponse.length == 0) {
                alert("No followed vacations were found...")
            }
            else {
                followedVacationsArrayResponse.map(vacation => followedVacationsDestinationsArray.push(vacation.destination) &&
                vacationsFollowersNumberArray.push(vacation.amountOfFollowers));
                setFollowedVacationsDestinations(followedVacationsDestinationsArray);
                setVacationsFollowersNumber(vacationsFollowersNumberArray);
            }
        }
        catch (error: any) {
            alert(error.message);
            navigate('/')
        }
    }

    let onBackClick = (() => {
        navigate('/');
    })


    return (
        <div>
            <section className="layout">
                <header className="add-header-style">
                    <Header />
                    <TiArrowBack title='Back to Main Page' className="back-arrow-style" onClick={onBackClick} />
                </header>
                <main className="chart-container">
                    <Bar
                        data={{
                            labels: followedVacationsDestinations,
                            datasets: [{
                                barPercentage: 0.5,
                                pointStyle: 'circle',
                                data: vacationsFollowersNumber,
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
                                borderWidth: 2,

                            }]
                        }}
                        options={{
                            plugins: {
                                tooltip: {
                                    usePointStyle: true
                                },
                                legend: {
                                    display: false
                                },
                                title: {
                                    display: true,
                                    text: 'Followed Vacations!',
                                    font: {
                                        size: 20,
                                    }
                                }
                            },
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Number of Followers',
                                        padding: 20,
                                        font: {
                                            size: 17,
                                        },
                                    },
                                    beginAtZero: true,
                                    ticks: {
                                        font: {
                                            size: 14,
                                        }
                                    }
                                },

                                x: {
                                    title: {
                                        display: true,
                                        text: 'Vacations',
                                        padding: {
                                            top: 23
                                        },
                                        font: {
                                            size: 17,
                                        },
                                    },
                                    ticks: {
                                        font: {
                                            size: 15,

                                        }
                                    }
                                }

                            }
                        }
                        }
                        height={400}
                        width={600}
                    />
                </main>
            </section>
        </div>
    )
}

export default VacationsStatistics