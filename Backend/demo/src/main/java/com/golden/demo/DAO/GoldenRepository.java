package com.golden.demo.DAO;

import com.golden.demo.DTO.Golden;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GoldenRepository extends MongoRepository<Golden, String> {
}
