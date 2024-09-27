package com.newbins.dto;

public interface Convertible<T, D extends Convertible<T, D>> {
    D toDTO(T entity);
}
