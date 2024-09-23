package com.newbins;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.newbins.mapper")
public class WithBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WithBackendApplication.class, args);
	}

}
