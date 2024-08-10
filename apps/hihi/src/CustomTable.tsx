import classNames from 'classnames'

// Define a Column interface that accepts a key and a header.
interface Column<T extends string> {
  key: T
  header?: string
  classColumn?: string
}

// Define the props for the CustomTable component, allowing readonly arrays.
interface CustomTableProps<T extends string> {
  data: Array<Record<T, any>>
  columns: ReadonlyArray<Column<T>>
  noHeader?: boolean
  classRow?: string
  classBorder?: string
}

// The CustomTable component enforces the structure of data based on the columns.
const CustomTable = <T extends string>({
  data,
  columns,
  noHeader,
  classRow,
  classBorder
}: CustomTableProps<T>) => {
  return (
    <div className={classNames('w-full', classBorder && 'border', classBorder)}>
      {!noHeader && (
        <div className={classNames('flex ', classRow, classBorder)}>
          {columns.map((column) => (
            <div
              key={column.key}
              className={classNames(
                'flex-1 p-2 font-semibold text-left  ',
                column.classColumn,
                classBorder && 'border-r last:border-r-0',
                classBorder
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
              classBorder && (!noHeader || rowIndex !== 0) && 'border-t',
              classBorder
            )}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className={classNames(
                  'flex-1 p-2 ',
                  column.classColumn,
                  classBorder && 'border-r last:border-r-0',
                  classBorder
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

export default CustomTable
