import React, { Component } from 'react';

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
                        Create
                    </button>
                </form>
            </>
        );
    }
}

export default NewTaskForm;