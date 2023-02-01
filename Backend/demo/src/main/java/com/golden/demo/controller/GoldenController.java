package com.golden.demo.controller;


import com.golden.demo.DAO.GoldenRepository;
import com.golden.demo.DTO.Golden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin
@RestController
@RequestMapping("/golden")
public class GoldenController {

    @Autowired
    private GoldenRepository goldenRepository;

    @GetMapping
    public List<Golden> index (){
        return (goldenRepository.findAll());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    Golden create (@RequestBody Golden golden){
        return (goldenRepository.save(golden));
    }

    @PutMapping("{id}")
    Golden update (@PathVariable String id, @RequestBody Golden golden){
        Golden golden1 = goldenRepository.findById(id).orElseThrow(RuntimeException::new);

        golden1.setEmail(golden.getEmail());
        golden1.setPassword(golden.getPassword());
        golden1.setCel(golden.getCel());
        golden1.setCuntry(golden.getCuntry());
        golden1.setFecha(golden.getFecha());
        golden1.setTag(golden.getTag());
        golden1.setActive(golden.isActive());

        return(goldenRepository.save(golden1));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete (@PathVariable String id){
    Golden golden = goldenRepository.findById(id).orElseThrow(RuntimeException::new);

    goldenRepository.delete(golden);
    }

}
