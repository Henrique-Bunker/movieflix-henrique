package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieReviewDTO;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository repository;

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthService authService;
	
	@Transactional(readOnly = true)
	public List<MovieReviewDTO> findByMovieId(Long movieId) {
		List<Review> list = repository.findByMovieId(movieId);
		return list.stream().map(x -> createMovieReview(x)).collect(Collectors.toList());
	}

	@PreAuthorize("hasAnyRole('MEMBER')")
	@Transactional
	public MovieReviewDTO insert(MovieReviewDTO dto) {
		
		User user = authService.authenticated();

		Review entity = new Review();
		entity.setText(dto.getText());
		entity.setMovie(movieRepository.getOne(dto.getMovieId()));
		entity.setUser(userRepository.getOne(user.getId()));
		entity = repository.save(entity);
		return createMovieReview(entity);
	}
	
	private MovieReviewDTO createMovieReview(Review review) {
		Optional<User> obj = userRepository.findById(review.getUser().getId());
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		UserDTO userDTO = new UserDTO(entity);
		return new MovieReviewDTO(review, userDTO);
	}
}
