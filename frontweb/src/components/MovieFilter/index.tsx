import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select, { NonceProvider } from 'react-select'
import { Genre } from 'types/Genre'
import { requestBackend } from 'utils/requests'
import './styles.css'

export type ProductFilterData = {
  genre: Genre | null
}

type Props = {
  onSubmitFilter?: (data: ProductFilterData) => void
}

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>([])
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<ProductFilterData>()

  const handleFormClear = () => {
    setValue('genre', null)
  }

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value)

    const obj: ProductFilterData = {
      genre: getValues('genre'),
    }

    //onSubmitFilter(obj)
  }

  useEffect(() => {
    requestBackend({ url: `/genres`, withCredentials: true }).then((result) => {
      setSelectGenres(result.data)
      console.log(selectGenres)
    })
  }, [])

  const onSubmit = async (formData: ProductFilterData) => {
    //onSubmitFilter(formData)
  }

  return (
    <div className="base-card movie-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="movie-filter-genre-container">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectGenres}
                isClearable
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: '#fff',
                  },
                })}
                placeholder="Genero"
                classNamePrefix="movie-genre-select"
                onChange={(value) => handleChangeGenre(value as Genre)}
                getOptionLabel={(genre: Genre) => genre.name}
                getOptionValue={(genre: Genre) => String(genre.id)}
                isSearchable
              />
            )}
          />
        </div>
      </form>
    </div>
  )
}

export default MovieFilter
