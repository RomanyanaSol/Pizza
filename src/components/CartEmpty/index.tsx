import { Link } from 'react-router-dom';

export default function CartEmpty() {
    return (
        <div>
            <div className="cart cart--empty">
                <h2>The cart is empty 😕</h2>
                <p>
                    Most likely, you haven't ordered pizza yet.<br />
                    To order pizza, go to the main page.
                </p>
                <img src="img/empty-cart.png" alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <p>come back</p>
                </Link>
            </div>
        </div>
    )
}
