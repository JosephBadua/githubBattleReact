import React from 'react';
import PropTypes from 'prop-types';
import { fetcPopularRepos, fetchPopularRepos} from '../utils/api'

function LanguagesNav ({selected, onUpdateLanguage}) {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <ul className='flex-center'>
            {languages.map((language) => (
                <li key={language}>
                    <button className="btn-clear nav-link" style={language === selected ? { color: 'rgb(187, 46, 31)'} : null }  onClick={() => onUpdateLanguage(language)} >
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.PropTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func,
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: null,
            error: null
        }
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }
    updateLanguage (selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null,
            repos: null
        })

        fetchPopularRepos(selectedLanguage)
        .then((repos) => this.setState({
            repos,
            error: null
        }))
        .catch(() => {
            console.warn(`error with repos ${error}`)

            this.setState({
                error: `There was an error getting the repos`
            })
        })
    }
    isLoading() {
        return this.state.repos === null && this.state.error === null
    }
    render() {
        const {selectedLanguage, repos, error} = this.state 

        return (
            <React.Fragment>
                <LanguagesNav 
                selected = {selectedLanguage}
                onUpdateLanguage = {this.updateLanguage}
                />
                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
                 {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}

            </React.Fragment>
        )
    }
}