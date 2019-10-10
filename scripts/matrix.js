class Matrix {
    constructor(r, c) {
        this.rows = r;
        this.columns = c;
        this.data = [];
        var i, j;
        for (i = 0; i < this.rows; i++) {
            this.data.push([]);
            for (j = 0; j < this.columns; j++) {
                this.data[i].push(0);
            }
        }
    }

    set values(v) {
        var i, j, idx;
        // v is already a 2d array with dims equal to rows and columns
        if (v instanceof Array && v.length === this.rows && 
            v[0] instanceof Array && v[0].length === this.columns) {
            this.data = v;
        }
        // not valid
        else {
            console.log("could not set values for " + this.rows + "x" + this.columns + " maxtrix");
        }
    }

    get values() {
        return this.data.slice();
    }

    // matrix multiplication (this * rhs)
    mult(rhs) {
        var result = null;
        // ensure multiplication is valid
        if (rhs instanceof Matrix && this.columns === rhs.rows) {
            let newMatrix = new Matrix(this.rows, rhs.columns); // new matrix that is the matrix product
            let values = []; // array of rows in the new matrix product
            for (let row = 0; row < this.rows; row++) { // loop through rows of first matrix
                let valueRow = []; // values of a row as an array
                for (let m2c = 0; m2c < rhs.columns; m2c++) { // loop through columns of second matrix
                    let products = 0; // value after adding all products together from row and column multiplication
                    for (let m1c = 0; m1c < this.columns; m1c++) { // loop through columns of first matrix
                        let matrix1Value = this.data[row][m1c]; // value from first matrix at specified row and column
                        let matrix2Value = rhs.data[m1c][m2c]; // value from second matrix at specified column as row and second matrix column
                        products += matrix1Value * matrix2Value;
                    }
                    valueRow.push(products);
                }
                values.push(valueRow);
            }
            newMatrix.values = values;
            result = newMatrix;
        }
        else {
            console.log("could not multiply - row/column mismatch");
        }
        return result;
    }
}

Matrix.multiply = function(...args) {
    var i;
    var result = null;
    // ensure at least 2 matrices
    if (args.length >= 2 && args.every((item) => {return item instanceof Matrix;})) {
        result = args[0];
        i = 1;
        while (result !== null && i < args.length) {
            result = result.mult(args[i]);
            i++;
        }
    }
    else {
        console.log("could not multiply - requires at least 2 matrices");
    }
    return result;
};
