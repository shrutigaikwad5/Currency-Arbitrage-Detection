import { useEffect, useState } from "react";
import api from "../services/api";

function CurrencyPage() {

    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {

        api.get("/currency")
            .then(response => {

                setCurrencies(response.data);

            })
            .catch(error => {

                console.log(error);

            });

    }, []);

    return (

        <div>

            <h2>Currency List</h2>

            {
                currencies.map(currency => (

                    <div key={currency.currencyCode}>

                        {currency.currencyCode}
                        {" "}
                        {currency.currencyName}

                    </div>

                ))
            }

        </div>

    );

}

export default CurrencyPage;