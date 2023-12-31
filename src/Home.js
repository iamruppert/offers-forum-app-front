import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Modal, Button } from 'react-bootstrap';

class Home extends Component {


    constructor(props) {
        super(props);

        this.state = {
            offers: {
                content: [],
                totalPages: 0,
            },
            currentPage: 0,
            itemsPerPage: 4,
            sortOption: 'name', // Default sorting option
            selectedOffer: null,
        };
    }

    componentDidMount() {


        this.fetchOffers();

        // Disable navigation using the browser's back button
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', this.preventBackNavigation);
    }

    componentWillUnmount() {
        // Remove the event listener when the component is unmounted
        window.removeEventListener('popstate', this.preventBackNavigation);
    }

    preventBackNavigation = (event) => {
        // Push a new state to prevent going back
        window.history.pushState(null, null, window.location.pathname);
    };

    fetchOffers = async () => {
        const { currentPage, itemsPerPage, sortOption } = this.state;
        try {
            const response = await fetch(`http://localhost:8080/api/listAllOffers?page=${currentPage}&size=${itemsPerPage}&sortBy=${sortOption}`);
            if (response.ok) {
                const { content, totalPages } = await response.json();
                this.setState({ offers: { content, totalPages } });
            } else {
                console.error('Failed to fetch offers:', response.statusText);
            }
        } catch (error) {
            console.error('Error during offer fetch:', error.message);
        }
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage }, () => this.fetchOffers());
    };

    handleSortChange = (newSortOption) => {
        this.setState({ sortOption: newSortOption }, () => this.fetchOffers());
    };

    handleOfferClick = (offer) => {
        this.setState({ selectedOffer: offer });
    };

    handleModalClose = () => {
        this.setState({ selectedOffer: null });
    };

    render() {
        const { offers, currentPage, itemsPerPage, sortOption, selectedOffer } = this.state;
        const { content, totalPages } = offers;

        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mx-auto">NoFluffCareers</h2>
                    <div className="d-flex gap-2">
                        <Link to="/register" className="btn btn-success">
                            Register
                        </Link>
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort By
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                                <li>
                                    <button className="dropdown-item" onClick={() => this.handleSortChange('name')}>
                                        Name <i className="fas fa-sort-alpha-down"></i>
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => this.handleSortChange('salary_asc')}>
                                        Salary Ascending <i className="fas fa-dollar-sign"></i><i className="fas fa-sort-amount-up"></i>
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => this.handleSortChange('salary_desc')}>
                                        Salary Descending <i className="fas fa-dollar-sign"></i><i className="fas fa-sort-amount-down"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {content.map((offer, index) => (
                        <div key={index} className="col">
                            <div className="card" style={{ cursor: 'pointer' }} onClick={() => this.handleOfferClick(offer)}>
                                <div className="card-body d-flex align-items-center">
                                    <img
                                        src="https://www.worldsbestcatlitter.com/wp-content/uploads/2016/09/cat-affection-blog-image-1.jpg"
                                        alt={`Offer ${index}`}
                                        className="mr-2"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                    <div style={{ flex: '1', textAlign: 'center' }}>
                                        <h5 className="card-title">{offer.name}</h5>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p className="card-text">
                                            {offer.salary} {offer.currency}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedOffer && (
                    <Modal show={selectedOffer !== null} onHide={this.handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedOffer.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Position: {selectedOffer.position}</p>
                            <p>Keywords: {selectedOffer.keywords.join(', ')}</p>
                            <p>Salary: {selectedOffer.salary} {selectedOffer.currency}</p>
                            <p>Added By: {`${selectedOffer.recruiter.name} ${selectedOffer.recruiter.surname}`}</p>
                            <p>Email: {selectedOffer.recruiter.email}</p>
                            {/* Add other details as needed */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}

                <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination">
                            {[...Array(totalPages).keys()].map((index) => (
                                <li key={index} className={`page-item ${index === currentPage ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => this.handlePageChange(index)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Home;
