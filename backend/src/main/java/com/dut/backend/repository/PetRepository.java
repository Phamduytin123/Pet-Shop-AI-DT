package com.dut.backend.repository;

import com.dut.backend.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository  extends JpaRepository<Pet, Integer> {
    @Query("SELECT  p.breed FROM Pet p ")
    List<String> findBreeds();
    Pet findByBreed(String breed);
}
