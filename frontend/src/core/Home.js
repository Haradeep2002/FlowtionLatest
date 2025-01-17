import { isAuthenticated } from '../auth'
import { getCategories, getFlows } from "../user/apiHelper";
import { useEffect, useState } from "react";
import ReactFlowRenderer from '../react-flow-renderer';
import Showflow from '../user/Showflow'
import Menu from "./Menu";
import './style.css'
import './Home.css';
import { Redirect } from 'react-router-dom';
const Home = () => {
    const [categories, setCategories] = useState(false)
    const [flowcharts, setFlowcharts] = useState(false)
    const [currentFlowChart, setCurrentFlowChart] = useState([])
    const [flag, setFlag] = useState(false)
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log("error occured")
            } else {

                let mySet1 = new Set()
                data.map((d, i) => {
                    // console.log(d.category)
                    mySet1.add(d.category)
                })
                const array = [...mySet1];
                setCategories(array)
            }
        })

        getFlows().then(data => {
            if (data.error) {
                console.log("error occured")
            } else {
                setFlowcharts(data)
            }
        })
    };
    const handleClick = (e) => {
        setCurrentFlowChart([])
        setFlag(true)
        // console.log(e.target.value)
        let x = []
        flowcharts.map((fc, i) => {
            // console.log(fc.category === e.target.value)
            if (fc.category === e.target.value) {
                x.push(fc)
            }
        })
        setCurrentFlowChart(x)
        // console.log(currentFlowChart)
    }

    useEffect(() => {
        init();
    }, []);


    return (

        <div style={{height:'1000px'}}>


            {/* {isAuthenticated().user.role === 0 && */}
            <div style={{ backgroundColor: 'rgba(5, 0, 255, 0.4)' }}>
                <Menu></Menu>
            
                {
                    !isAuthenticated() && <Redirect to="/signin"></Redirect>
                }
                <div>


                    

                    {
                        !flag && isAuthenticated() && isAuthenticated().user.role === 0 && 
                        <h2 style={{ marginLeft: '20%', color: 'black' ,fontWeight:'bolder'}}>
                         
                            Please select a Category
                        </h2>
                    }



                    <div style={{ display: 'flex' ,flexWrap: 'wrap'}}>
                        {

                            !flag && isAuthenticated() && isAuthenticated().user.role === 0 &&
                            categories && categories.map((fc, i) => {
                                return (<div style={{margin:'50px'}} key={i}><div >
                                    <div className="cards-list">
                                    <div className="card 3">
                                        <div className="card_image">
                                            <img style ={{backgroundColor: 'pink'}}src="https://media4.giphy.com/media/7FrOU9tPbgAZtxV5mb/200w.webp?cid=ecf05e47ziso8zl7yag6mibkrhsz3j5fwbqk3nixrvtjomp9&rid=200w.webp&ct=g" />
                                        </div>
                                        <div className="card_title">
                                            <button type="submit" key={i} value={fc} onClick={(e) => handleClick(e)} >
                                                🚀{fc}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </div></div>)
                            })
                        }
                    </div>


                </div>


                {/* } */}

                {isAuthenticated() && isAuthenticated().user.role === 1 &&
                    // <div style={{backgroundColor:'rgba(5,0,255,0.4'}}>

                    <ReactFlowRenderer />
                    // </div>

                }
                {flag && isAuthenticated() && isAuthenticated().user.role === 0 &&
                    <Showflow flow={currentFlowChart}></Showflow>
                }

            </div >



        </div >
    )
}

export default Home;