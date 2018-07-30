import React, { Component } from 'react';

class AddFileForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            file: null
        }
    }

    onHandleChange = (e)=>{
        this.setState({
            [e.target.id] : e.target.files[0]
        })
    }

    onHandleSubmit = (e)=>{
        e.preventDefault();
        const fileReader = new FileReader();
        fileReader.readAsText(this.state.file);
        fileReader.onloadend = ()=>{
            const data = JSON.parse(fileReader.result);
            this.props.addEvent(data,'ADD_FROM_FILE');
        }
    }

    render() {
        return (
            <form onSubmit={this.onHandleSubmit}>
                <div className="custom-file mb">
                    <label className="custom-file-label">{this.state.file ? this.state.file.name :'Choose JSON file to export'}</label>
                    <input
                        type="file" 
                        className="custom-file-input" 
                        id="file"
                        accept=".json"
                        onChange={this.onHandleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Export</button>
                <p>Notice: export file will remove all current schedules</p>
            </form>
        );
    }
}

export default AddFileForm;
