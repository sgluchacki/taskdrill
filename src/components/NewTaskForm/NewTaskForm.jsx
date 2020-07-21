import React, { Component } from 'react';
import "./NewTaskForm.css";

class NewTaskForm extends Component {
    state = {
        formData: {
            name: '',
            details: ''
        }
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
        this.props.handleAddTask(this.state.formData);
        this.setState({
            formData: {
                name: '',
                details: ''
            }
        });
    }

    render() {
        return (
            <>
                <form className="task-form" onSubmit={this.handleSubmit}>
                    <h3 className="panel-title">CREATE A NEW TASK</h3>
                    <div className="form-group">
                        <label>Name (required)</label>
                        <br />
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
                        <br />
                        <input
                            className="form-control"
                            name="details"
                            value={this.state.formData.details}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn-create"
                        >
                            CREATE
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

export default NewTaskForm;