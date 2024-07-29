import TableContent from '../customs/TableContent';
import TablePaginator from '../customs/TablePaginator';


export default async function Table() {
    return (
        <div className="card mt-4 mx-4">
            <TableContent />
            <TablePaginator />
        </div>
    );
}
