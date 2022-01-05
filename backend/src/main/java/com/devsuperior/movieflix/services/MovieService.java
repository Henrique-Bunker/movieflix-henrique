package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieGenreDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;
	
	@Transactional(readOnly = true)
	public List<MovieGenreDTO> findAll() {
		List<Movie> list = repository.findAll();
		return list.stream().map(x -> new MovieGenreDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public Page<MovieGenreDTO> findAllPaged(Long genreId, Pageable pageable) {
		Page<Movie> list = (genreId == 0) ? repository.findAllByOrderByTitleAsc(pageable) : repository.findByGenreIdOrderByTitleAsc(genreId, pageable);
		repository.findMovieWithGenres(list.getContent());
		return list.map(x -> new MovieGenreDTO(x));
	}
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new MovieDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public MovieDTO findByGenre(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new MovieDTO(entity);
	}
}
