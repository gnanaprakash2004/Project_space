// import React from 'react'
// import { connect } from 'react-redux';
// import './portal.css';
// import Trainee from './user';
// import {Button,Popconfirm} from 'antd';
// import Operations from './operations';
// import Clock from './clock';
// import Alert from '../../common/alert';
// import apis from '../../../services/Apis';
// import { Post } from '../../../services/axiosCall';
// import { fetchTestdata } from '../../../actions/traineeAction'


// class Sidepanel extends React.Component {

//     endTest =()=>{
//         Post({
//             url:`${apis.END_TEST}`,
//             data:{
//                 testid: this.props.trainee.testid,
//                 userid:this.props.trainee.traineeid
//             }
//         }).then((response)=>{
//             if(response.data.success){
                
//                 this.props.fetchTestdata(this.props.trainee.testid,this.props.trainee.traineeid)
//             }
//             else{
//                 return Alert('error','Error!',response.data.message);
//             }
//         }).catch((error)=>{
//             return Alert('error','Error!','Error');
//         })
//     }



//     render(){
//         return (
//             <div className={"side-panel-in-exam-dashboard "+(this.props.mode==='desktop'?'w-20':'w-100')}>
//                 <Trainee />
//                 <Clock/>
//                 <Operations />
                
//                 <div className="End-test-container">
//                     <Popconfirm
//                         title="Are you sure to end the test"
//                         onConfirm={this.endTest}
//                         okText="Yes"
//                         cancelText="No"
//                     >
//                         <Button type="default">End Test</Button>
//                     </Popconfirm>
//                 </div>
                
                
//             </div>
//         )
//     }
// }


// const mapStateToProps = state => ({
//     trainee : state.trainee
// });



// export default connect(mapStateToProps,{
//     fetchTestdata
// })(Sidepanel);


// import React from 'react';
// import { connect } from 'react-redux';
// import './portal.css';
// import Trainee from './user';
// import { Button, Popconfirm } from 'antd';
// import Operations from './operations';
// import Clock from './clock';
// import Alert from '../../common/alert';
// import apis from '../../../services/Apis';
// import { Post } from '../../../services/axiosCall';
// import { fetchTestdata } from '../../../actions/traineeAction';

// class Sidepanel extends React.Component {
//     constructor(props) {
//         super(props);
//         this.videoRef = React.createRef();
//     }

//     componentDidMount() {
//         this.enableWebcam();
//     }

//     enableWebcam() {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then((stream) => {
//                 if (this.videoRef.current) {
//                     this.videoRef.current.srcObject = stream;
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error accessing webcam:', error);
//             });
//     }

//     endTest = () => {
//         Post({
//             url: `${apis.END_TEST}`,
//             data: {
//                 testid: this.props.trainee.testid,
//                 userid: this.props.trainee.traineeid
//             }
//         }).then((response) => {
//             if (response.data.success) {
//                 this.props.fetchTestdata(this.props.trainee.testid, this.props.trainee.traineeid);
//             } else {
//                 return Alert('error', 'Error!', response.data.message);
//             }
//         }).catch(() => {
//             return Alert('error', 'Error!', 'Error');
//         });
//     };

//     render() {
//         return (
//             <div className={"side-panel-in-exam-dashboard " + (this.props.mode === 'desktop' ? 'w-20' : 'w-100')}>
//                 <Trainee />
//                 <Clock />
//                 <Operations />

//                 <div className="End-test-container">
//                     <Popconfirm
//                         title="Are you sure to end the test"
//                         onConfirm={this.endTest}
//                         okText="Yes"
//                         cancelText="No"
//                     >
//                         <Button type="default">End Test</Button>
//                     </Popconfirm>
//                 </div>

//                 <div className="webcam-container">
//                     <video ref={this.videoRef} autoPlay={true} playsInline={true} muted={true} />
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => ({
//     trainee: state.trainee
// });

// export default connect(mapStateToProps, {
//     fetchTestdata
// })(Sidepanel);


import React from 'react';
import { connect } from 'react-redux';
import './portal.css';
import Trainee from './user';
import { Button, Popconfirm } from 'antd';
import Operations from './operations';
import Clock from './clock';
import Alert from '../../common/alert';
import apis from '../../../services/Apis';
import { Post } from '../../../services/axiosCall';
import { fetchTestdata } from '../../../actions/traineeAction';

class Sidepanel extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.stream = null; // Reference to the webcam stream
    }

    componentDidMount() {
        this.enableWebcam();
    }

    componentWillUnmount() {
        this.stopWebcam();
    }

    enableWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (this.videoRef.current) {
                    this.videoRef.current.srcObject = stream;
                    this.stream = stream;
                }
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
            });
    }

    stopWebcam() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    endTest = () => {
        Post({
            url: `${apis.END_TEST}`,
            data: {
                testid: this.props.trainee.testid,
                userid: this.props.trainee.traineeid
            }
        }).then((response) => {
            if (response.data.success) {
                this.props.fetchTestdata(this.props.trainee.testid, this.props.trainee.traineeid);
                this.stopWebcam(); // Stop webcam when test ends
            } else {
                return Alert('error', 'Error!', response.data.message);
            }
        }).catch(() => {
            return Alert('error', 'Error!', 'Error');
        });
    };

    render() {
        return (
            <div className={"side-panel-in-exam-dashboard " + (this.props.mode === 'desktop' ? 'w-20' : 'w-100')}>
                <Trainee />
                <Clock />
                <Operations />

                <div className="End-test-container">
                    <Popconfirm
                        title="Are you sure to end the test"
                        onConfirm={this.endTest}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="default">End Test</Button>
                    </Popconfirm>
                </div>

                <div className="webcam-container">
                    <video ref={this.videoRef} autoPlay={true} playsInline={true} muted={true} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    trainee: state.trainee
});

export default connect(mapStateToProps, {
    fetchTestdata
})(Sidepanel);
