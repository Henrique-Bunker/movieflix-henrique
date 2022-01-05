package com.devsuperior.movieflix.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.movieflix.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
	
	@Query("SELECT obj FROM Movie obj INNER JOIN obj.genre WHERE "
			+ "(obj.id = :id)")
	Movie findMovie(Long id);
	
	Page<Movie> findByGenreIdOrderByTitleAsc(Long genreId, Pageable pageable);
	
	Page<Movie> findAllByOrderByTitleAsc(Pageable pageable);
	
	@Query("SELECT obj FROM Movie obj JOIN FETCH obj.genre WHERE obj IN :movies")
	List<Movie> findMovieWithGenres(List<Movie> movies);
}
