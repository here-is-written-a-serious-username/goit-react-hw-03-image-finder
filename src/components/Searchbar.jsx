import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';

class Searchbar extends Component {
    state = {
        search: '',
    }

    handleChange = evt => {
        const { name, value } = evt.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();

        this.props.onSubmit(this.state);
    }

    render() {

        return (
            <header className='Searchbar'>
                <form className='SearchForm' onSubmit={this.handleSubmit}>
                    <button type="submit" className='SearchForm-button'>
                        <span className='SearchForm-button-label'>Search</span>
                    </button>

                    <input
                        className='SearchForm-input'
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="search"
                        onChange={this.handleChange}
                        value={this.state.search}
                    />
                </form>
            </header>
        )
    }
}


export default Searchbar;