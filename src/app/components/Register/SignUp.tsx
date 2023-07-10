import React, {useState, Component} from 'react';
import RegisterPart1 from './RegisterPart1';
import RegisterPart2 from './RegisterPart2';
import RegisterPart3 from './RegisterPart3';
import Success from './SuccessPage';



export default function SignUp(props: { setShowSignUpModal: (arg0: boolean) => void; }) {
    
    const [ state, setState] = useState({
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        university: '',
        course: '',
    })
    console.log("Hi");

    const registerCallback = (data: any) => {
        setState({
            step: data.step,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            university: data.university,
            course: data.course,
        });
        console.log(state);
    }


    

    const prevStep = () => {
        const step = state.step;
        setState({
            step: step - 1,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
            university: state.university,
            course: state.course,
        });
    }

    const nextStep = () => {
        const step = state.step;
        console.log(state);
        setState({
            step: step + 1,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
            university: state.university,
            course: state.course,
        });
        
    }

    //handle change of a particular field in state
    const handleChange = (field: any, value: any) => {
        setState(state => ({ ...state, [field]: value }));
    }

    // const handleChange = (input: any) => (e: { target: { value: any; }; }) => {
    //     this.setState({ [input]: e.target.value });
    // }

    const handleClose = () => {
        props.setShowSignUpModal(false);
    }
    

    

    switch (state.step) {
        case 1: 
            return (
            <RegisterPart1 
                nextStep={nextStep}
                setState={setState}
                values={state}
                handleClose={handleClose}
                registerCallback={registerCallback}
                //setShowSignUpModal={this.props.setShowSignUpModal}
            />
            )
        case 2: 
            return (
            <RegisterPart2 
                prevStep={prevStep}
                nextStep={nextStep}
                setState={setState}
                values={state}
                handleClose={handleClose}
                //setShowSignUpModal={this.props.setShowSignUpModal}
            />
            )
        case 3: 
            return (
            <RegisterPart3 
                prevStep={prevStep}
                nextStep={nextStep}
                setState={setState}
                values={state}
                handleClose={handleClose}
                //setShowSignUpModal={this.props.setShowSignUpModal}
            />
            )
        case 4:
            return (
            <Success 
                handleClose={handleClose}
                //setShowSignUpModal={this.props.setShowSignUpModal}
            />
            )
        // never forget the default case, otherwise VS code would be mad!
        default: 
            // do nothing

        return null;
          
    }
}