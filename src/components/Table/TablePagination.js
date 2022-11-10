import TablePagination from '@material-ui/core/TablePagination';

export default function PaginateTable(props) {
    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={(Math.ceil(allItem / eachPageTtem))}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            color="info"
        />
    )
}
PaginateTable.propTypes = {

    allItem: PropTypes.string,
    eachPageTtem: PropTypes.number,
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};