package com.golden.demo.DTO;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "proj_TM")
public class Golden {

    @Id
    private String id;
    private String email;
    private String password;
    private String cel;
    private String cuntry;
    private String tag;
    private Date fecha;
    private boolean active;

}
