const ContractorDetails = ({contractor}) => {

    return (
        <div className="contractor">
            {contractor && <table>
                <caption className="title">Dane wykonawcy zlecenia</caption>
                <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Email</th>
                    <th>Numer telefonu</th>
                    <th>Licencja</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{contractor?.firstName}</td>
                    <td>{contractor?.lastName}</td>
                    <td>{contractor?.email}</td>
                    <td>{contractor?.phone}</td>
                    <td>{contractor?.license}</td>
                </tr>
                </tbody>
            </table>}
            {!contractor && <span>Nikt jeszcze nie podjął się tego zlecenia.</span>}
        </div>
    );
};
export default ContractorDetails;
