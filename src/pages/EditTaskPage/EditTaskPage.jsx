import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditTaskPage extends Component {
    state = {
        formData: this.props.location.state.selectedTask
    };

    handleChange = e => {
        const formDataAsUserTypes = {
            ...this.state.formData,
            [e.target.name]: e.target.value
        }

        this.setState({
            formData: formDataAsUserTypes
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleUpdateTask(this.state.formData);
    }

    render() {
        return (
            <>
                <h1>Edit Task</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name (required)</label>
                        <input
                            className="form-control"
                            name="name"
                            value={this.state.formData.name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Details</label>
                        <input
                            className="form-control"
                            name="details"
                            value={this.state.formData.details}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn"
                    >
                    EDIT
                    </button>
                    <Link to='/'>CANCEL</Link>
                </form>
            </>
        );
    }
}

export default EditTaskPage;