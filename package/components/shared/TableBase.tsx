import classNames from 'classnames'
import React, { memo } from 'react'

// Define a Column interface that accepts a key and a header.
interface Column<T extends string> {
  key: T
  header?: string
  classColumn?: string
}

// Define the props for the TableBase component, allowing readonly arrays.
interface TableBaseProps<T extends string> {
  data: Array<Record<T, any>>
  columns: ReadonlyArray<Column<T>>
  noHeader?: boolean
  classRow?: string
  classBorder?: string
}

// The TableBase component enforces the structure of data based on the columns.
const TableBase = memo(
  <T extends string>({
    data,
    columns,
    noHeader,
    classRow,
    classBorder
  }: TableBaseProps<T>) => {
    return (
      <div
        className={classNames('w-full', classBorder && `border ${classBorder}`)}
      >
        {!noHeader && (
          <div className={classNames('flex ', classRow, classBorder)}>
            {columns.map((column) => (
              <div
                key={column.key}
                className={classNames(
                  'flex-1 p-2 font-semibold text-left  ',
                  column.classColumn,
                  classBorder && `border-r last:border-r-0 ${classBorder}`
                )}
              >
                {column.header}
              </div>
            ))}
          </div>
        )}
        <div className='flex flex-col'>
          {data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={classNames(
                'flex',
                classRow,
                classBorder &&
                  (!noHeader || rowIndex !== 0) &&
                  `border-t ${classBorder}`
              )}
            >
              {columns.map((column) => (
                <div
                  key={column.key}
                  className={classNames(
                    'flex-1 p-2 ',
                    column.classColumn,
                    classBorder && `border-r last:border-r-0 ${classBorder}`
                  )}
                >
                  {row[column.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

type ColumnKeys<T> = T extends Column<infer K> ? K : never

export type DataFromColumns<T extends ReadonlyArray<Column<string>>> = {
  [K in ColumnKeys<T>]: any
}

//useage
// const columns = [
//     { key: 'id', header: 'ID' },
//     { key: 'name', header: 'Name' },
//     { key: 'age', header: 'Age' },
//   ] as const;
// type ColumnsType = typeof columns;
// type DataType = DataFromColumns<ColumnsType>;
// Example data following the inferred DataType
// const data: DataType[] = [
//     { id: 1, name: 'John Doe', age: 28 },
//     { id: 2, name: 'Jane Smith', age: 34 },
//     { id: 3, name: 'Sam Green', age: 22 },
//   ];

export default TableBase
