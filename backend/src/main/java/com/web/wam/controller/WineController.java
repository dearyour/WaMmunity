package com.web.wam.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.wam.model.dto.BaseResponse;
import com.web.wam.model.dto.wine.WineResponse;
import com.web.wam.model.dto.wine.WineReviewPostRequest;
import com.web.wam.model.dto.wine.WineReviewPutRequest;
import com.web.wam.model.dto.wine.WineSurveyRequest;
import com.web.wam.model.dto.wine.WineWishlistRequest;
import com.web.wam.model.service.WineService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "와인관리 API", tags = { "wine" })
@RestController
@RequestMapping("/wine")
public class WineController {
	@Autowired
	WineService wineService;

	@GetMapping
	@ApiOperation(value = "전체 와인 리스트", notes = "전체 와인리스트 불러오기")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> getAllWine() {
		List<WineResponse> wineList = wineService.getAllWine();
		return ResponseEntity.status(200).body(BaseResponse.of(200, wineList));
	}

	@GetMapping("/{wineId}")
	@ApiOperation(value = "와인 상세 정보", notes = "선택한 와인 와인 상제 정보 불러오기")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> searchWindByWindId(
			@ApiParam(value = "와인 아이디 정보", required = true) @PathVariable("wineId") int wineId) {
		WineResponse wine = wineService.searchWindByWindId(wineId);
		return ResponseEntity.status(200).body(BaseResponse.of(200, wine));
	}

	@GetMapping("/sort/{sortType}")
	@ApiOperation(value = "와인 정렬", notes = "조건별로 와인 정렬하기")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> sortWine(
			@ApiParam(value = "선택한 정렬 정보", required = true) @PathVariable("sortType") int sortType) {
		List<WineResponse> wineList = wineService.sortWine(sortType);
		return ResponseEntity.status(200).body(BaseResponse.of(200, wineList));
	}

	@GetMapping("/search/{keyword}")
	@ApiOperation(value = "와인 검색", notes = "와인 이름으로 검색하기")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> searchWineByKeyword(
			@ApiParam(value = "검색 키워드 정보", required = true) @PathVariable("keyword") String keyword) {
		List<WineResponse> wineList = wineService.searchWineByKeyword(keyword);
		return ResponseEntity.status(200).body(BaseResponse.of(200, wineList));
	}

	@PostMapping("/review")
	@ApiOperation(value = "리뷰 및 평점 작성", notes = "와인의 리뷰 및 평점 작성")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 404, message = "게시글 없음", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> createArticle(
			@RequestBody @ApiParam(value = "리뷰 및 평점 생성 정보", required = true) WineReviewPostRequest wineReviewInfo) {
		wineService.createReview(wineReviewInfo);
		return ResponseEntity.status(200).body(BaseResponse.of(200, "Success"));
	}

	@PutMapping("/review")
	@ApiOperation(value = "리뷰 및 평점 수정", notes = "와인의 리뷰 및 평점 수정")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 404, message = "게시글 없음", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> updateArticle(
			@RequestBody @ApiParam(value = "리뷰 및 평점 수정 정보", required = true) WineReviewPutRequest wineReviewInfo) {
		wineService.updateReview(wineReviewInfo);
		return ResponseEntity.status(200).body(BaseResponse.of(200, "Success"));
	}

	@DeleteMapping("/review/{wineReviewId}")
	@ApiOperation(value = "리뷰 및 평점 삭제", notes = "와인의 리뷰 및 평점 삭제")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 404, message = "게시글 없음", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> deleteArticle(
			@ApiParam(value = "삭제할 와인 리뷰 정보", required = true) @PathVariable("wineReviewId") int wineReviewId) {
		wineService.deleteReview(wineReviewId);
		return ResponseEntity.status(200).body(BaseResponse.of(200, "Success"));
	}

	@PostMapping("/wishlist")
	@ApiOperation(value = "위시리스트 담기", notes = "와인을 위시리스트에 담기")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 404, message = "게시글 없음", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> saveWishlist(
			@RequestBody @ApiParam(value = "리뷰 및 평점 생성 정보", required = true) WineWishlistRequest wineWishListInfo) {
		wineService.saveWishlist(wineWishListInfo);
		return ResponseEntity.status(200).body(BaseResponse.of(200, "Success"));
	}

	@DeleteMapping("/wishlist/{wishlistId}")
	@ApiOperation(value = "위시리스트 삭제", notes = "위시리스트에서 해당 와인 삭제")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 404, message = "게시글 없음", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> deleteWishlist(
			@ApiParam(value = "삭제할 와인 리뷰 정보", required = true) @PathVariable("wishlistId") int wishlistId) {
		wineService.deleteWishlist(wishlistId);
		return ResponseEntity.status(200).body(BaseResponse.of(200, "Success"));
	}

	@GetMapping("/wishlist/{memberId}")
	@ApiOperation(value = "위시리스트 보기", notes = "해당 회원 아이디의 와인 위시 리스트 불러오기")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> searchWishlistByMemberId(
			@ApiParam(value = "회원 아이디 정보", required = true) @PathVariable("memberId") int memberId) {
		List<Integer> wishlist = wineService.searchWishlistByMemberId(memberId);
		return ResponseEntity.status(200).body(BaseResponse.of(200, wishlist));
	}

	@PostMapping("/survey")
	@ApiOperation(value = "취향 분석 설문", notes = "취향 분석 설문 결과 저장")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 404, message = "게시글 없음", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> saveWineSurvey(
			@RequestBody @ApiParam(value = "취향 분석 설문 결과 정보", required = true) WineSurveyRequest wineSurveyRequest) {
		wineService.saveWineSurvey(wineSurveyRequest);
		return ResponseEntity.status(200).body(BaseResponse.of(200, "Success"));
	}

	// TODO : 와인 DB에 저장되는 형식 확인 후 확실히 수정
	// filter/minPrice=500&maxPrice=54000 ~~~~~~
	@GetMapping("/filter/{filter}")
	@ApiOperation(value = "필터 적용해서 와인 리스트 보기", notes = "해당 필터에 해당하는 와인 리스트 불러오기")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponse.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponse.class) })

	public ResponseEntity<? extends BaseResponse> searchWineByFilter(
			@ApiParam(value = "회원 아이디 정보", required = true) @PathVariable("filter") Map filter) {
		List<WineResponse> wineList = wineService.searchWineByFilter(filter);
		return ResponseEntity.status(200).body(BaseResponse.of(200, wineList));
	}
}