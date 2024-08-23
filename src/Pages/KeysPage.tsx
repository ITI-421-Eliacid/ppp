import {Link} from 'react-router-dom';

function SignInvoicePage() {
    return (
    <div className="container">
        <div>
            <ul>
                <li className="nav-item btn btn-primary">
                    <Link to="/GenerateKeysPage" className="nav-link">GenerateKeysPage</Link>
                </li>
            </ul>
        </div>
    </div>
    );
}

export default SignInvoicePage;