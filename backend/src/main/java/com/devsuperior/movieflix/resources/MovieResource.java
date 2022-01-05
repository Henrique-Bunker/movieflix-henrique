package com.devsuperior.movieflix.resources;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieGenreDTO;
import com.devsuperior.movieflix.dto.MovieReviewDTO;
import com.devsuperior.movieflix.services.MovieService;
import com.devsuperior.movieflix.services.ReviewService;

@RestController
@RequestMapping(value = "/movies")
public class MovieResource {

	private static Logger logger = LoggerFactory.getLogger(MovieResource.class);

	@Autowired
	private MovieService service;

	@Autowired
	private ReviewService reviewService;

	@GetMapping
	public ResponseEntity<Page<MovieGenreDTO>> findAll(
			@RequestParam(value = "genreId", defaultValue = "0") Long genreId, Pageable pageable) {
		Page<MovieGenreDTO> list = service.findAllPaged(genreId, pageable);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable Long id) {
		MovieDTO dto = service.findById(id);
		logger.error("Movie: " + dto.getGenre().getName());
		return ResponseEntity.ok().body(dto);
	}

	@GetMapping(value = "/{id}/reviews")
	public ResponseEntity<List<MovieReviewDTO>> findReviewsByMovieId(@PathVariable Long id) {
		List<MovieReviewDTO> list = reviewService.findByMovieId(id);
		// logger.error("Movie: " + dto.getGenre().getName());
		return ResponseEntity.ok().body(list);
	}
}
