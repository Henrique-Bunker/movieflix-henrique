package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.util.Objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.devsuperior.movieflix.entities.Review;

public class MovieReviewDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank(message = "Campo requerido")
	private String text;
	
	@NotNull
	private Long movieId;
	private UserDTO user;

	public MovieReviewDTO() {
	}

	public MovieReviewDTO(Long id, String text, Long movieId, UserDTO userDTO) {
		this.id = id;
		this.text = text;
		this.movieId = movieId;
		this.user = userDTO;
	}

	public MovieReviewDTO(Review entity, UserDTO user) {
		this.id = entity.getId();
		this.text = entity.getText();
		this.movieId = entity.getMovie().getId();
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUserId(UserDTO userDTO) {
		this.user = userDTO;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MovieReviewDTO other = (MovieReviewDTO) obj;
		return Objects.equals(id, other.id);
	}

}
